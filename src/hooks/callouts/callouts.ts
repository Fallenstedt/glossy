import React, { useContext } from "react";
import { useEffect } from "react";
import { Comments } from "./comments";
import { Tabs } from "./tab";
import { CommentCallback, TabCallback } from "./types";

class Callouts {
	private readonly commentCallbacks: CommentCallback[] = [];
	private readonly tabCallbacks: TabCallback[] = [];

	public readonly comments = new Comments(this.commentCallbacks);
	public readonly tabs = new Tabs(this.tabCallbacks);

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
