import React, { useContext } from "react";
import { useEffect } from "react";
import { Comments } from "./comments";
import { MirrorContent } from "./markdown-generator";
import { Modes } from "./tab";
import { TextColorInverter } from "./text-color-inverter";
import { CommentCallback, TabCallback, ThemeUpdateCallback } from "./types";

class Callouts {
	private readonly commentCallbacks: CommentCallback[] = [];
	private readonly tabCallbacks: TabCallback[] = [];
	private readonly themeUpdateCallbacks: ThemeUpdateCallback[] = [];

	public readonly mirrorContent = new MirrorContent();
	public readonly comments = new Comments(this.commentCallbacks);
	public readonly modes = new Modes(this.tabCallbacks);
	public readonly textColorInverter = new TextColorInverter(
		this.themeUpdateCallbacks
	);

	constructor() {
		this.mirrorContent.commentsFn(() => {
			return this.comments.allComments().map((comment) => comment.content);
		});
	}

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
		callback(this.modes.tab);

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
