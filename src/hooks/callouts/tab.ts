import { CALLOUT_TABS } from "../../util/constants";
import { TabCallback } from "./types";

export class Tabs {
	private _tab = CALLOUT_TABS.PASTE_YOUR_CODE;

	constructor(private tabcallbacks: TabCallback[]) {}

	public set tab(t: CALLOUT_TABS) {
		this._tab = t;
		this.tabcallbacks.forEach((cb) => cb(t));
	}

	public get tab() {
		return this._tab;
	}
}
