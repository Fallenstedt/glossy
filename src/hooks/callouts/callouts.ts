import React, { useContext } from "react";
import { useEffect } from "react";
import { Comments } from "./comments";
import { Tabs } from "./tab";
import { CommentCallback, TabCallback, ThemeUpdateCallback } from "./types";

class TextColorInverter {
	public isLight: boolean = true;

	constructor(private readonly callbacks: ThemeUpdateCallback[]) {}

	public setIsLight() {
		const el = document.querySelector(".CodeMirror") as HTMLDivElement;
		if (el) {
			const { isLight, hex } = this.getHexFromCodeMirrorTheme(el);

			this.isLight = isLight(hex);
			this.callbacks.forEach((c) => c(this.isLight));
		}
	}

	private getHexFromCodeMirrorTheme(el: HTMLDivElement) {
		const s = window.getComputedStyle(el);

		const rawRgbValues = s.backgroundColor
			.split(",")
			.map((s) => s.match(/\d/g))
			.map((d) => Number(d?.join("")));

		const rgbToHex = (r: number, g: number, b: number) =>
			"#" +
			[r, g, b]
				.map((x) => {
					const hex = x.toString(16);
					return hex.length === 1 ? "0" + hex : hex;
				})
				.join("");
		const hex = rgbToHex(rawRgbValues[0], rawRgbValues[1], rawRgbValues[2]);

		const isLight = (hex: string) => {
			const hexWithoutHashtag = hex.substring(1);
			const rgbDecimal = parseInt(hexWithoutHashtag, 16);
			const r = (rgbDecimal >> 16) & 0xff;
			const g = (rgbDecimal >> 8) & 0xff;
			const b = (rgbDecimal >> 0) & 0xff;

			// ITU-R BT.709
			// https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
			const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

			return luma > 40;
		};
		return { isLight, hex };
	}
}

class Callouts {
	private readonly commentCallbacks: CommentCallback[] = [];
	private readonly tabCallbacks: TabCallback[] = [];
	private readonly themeUpdateCallbacks: ThemeUpdateCallback[] = [];

	public readonly comments = new Comments(this.commentCallbacks);
	public readonly tabs = new Tabs(this.tabCallbacks);
	public readonly textColorInverter = new TextColorInverter(
		this.themeUpdateCallbacks
	);

	public onThemeUpdate(callback: ThemeUpdateCallback) {
		this.themeUpdateCallbacks.push(callback);
		callback(this.textColorInverter.isLight);

		return () => {
			const i = this.themeUpdateCallbacks.indexOf(callback);
			if (i > -1) {
				this.themeUpdateCallbacks.splice(i, 1);
			}
		};
	}

	public onCommentsUpdate(callback: CommentCallback) {
		this.commentCallbacks.push(callback);
		callback(this.comments.allComments());

		return () => {
			const i = this.commentCallbacks.indexOf(callback);
			if (i > -1) {
				this.commentCallbacks.splice(i, 1);
			}
		};
	}

	public onTabUpdate(callback: TabCallback) {
		this.tabCallbacks.push(callback);
		callback(this.tabs.tab);

		return () => {
			const i = this.tabCallbacks.indexOf(callback);
			if (i > -1) {
				this.tabCallbacks.splice(i, 1);
			}
		};
	}

	/**
	 * disconnect
	 */
	public disconnect() {}
}

function createCallouts() {
	let callouts: Callouts;
	return () => {
		if (!callouts) {
			callouts = new Callouts();
		}

		useEffect(() => () => callouts.disconnect(), []);

		return callouts;
	};
}

const CalloutsContext = React.createContext<Callouts | undefined>(undefined);
export const useInitializeCallouts = createCallouts();
export const CalloutsProvider = CalloutsContext.Provider;
export function useCallouts() {
	const context = useContext(CalloutsContext);

	if (!context) {
		throw new Error("Failed to create Callouts Context. Was it initalized?");
	}
	return context;
}
