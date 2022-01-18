import { CALLOUT_MODE } from "../../util/constants";
import { TabCallback } from "./types";

export class Modes {
	private _tab = CALLOUT_MODE.PASTE_YOUR_CODE;

	constructor(private tabcallbacks: TabCallback[]) {}

	public set tab(t: CALLOUT_MODE) {
		this._tab = t;
		this.tabcallbacks.forEach((cb) => cb(t));
	}

	public get tab() {
		return this._tab;
	}
}
