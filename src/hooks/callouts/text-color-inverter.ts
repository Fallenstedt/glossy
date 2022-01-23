import { ThemeUpdateCallback } from "./types";

export class TextColorInverter {
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
			return luma > 60;
		};
		return { isLight, hex };
	}
}
