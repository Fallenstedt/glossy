import React, { useContext } from "react";
import { useEffect } from "react";
import { SYNTACKS_TABS } from "../util/constants";

class Nums {
	public static nums = [
		10102, 10103, 10104, 10105, 10106, 10107, 10108, 10109, 10110, 10111,
	];

	public static getChar(n: number): string {
		return String.fromCharCode(Nums.nums[n]);
	}
}

export class Comment {
	public readonly id: string = new Date().toISOString();
	constructor(
		private readonly callbacks: () => void,
		private _content: string = "",
		private _label: string = ""
	) {}

	public set content(c: string) {
		this._content = c;
		this.callbacks();
	}

	public get content() {
		return this._content;
	}

	public set label(c: string) {
		this._label = c;
		this.callbacks();
	}

	public get label() {
		return this._label;
	}
}

class Comments {
	constructor(private readonly callbacks: CommentCallback[]) {}

	private readonly comments: Comment[] = [];

	public allComments(): Comment[] {
		return this.comments.slice();
	}

	public remainingComments() {
		return Nums.nums.length - this.comments.length;
	}

	public addComment(): Comment | null {
		if (this.commentIndex() === Nums.nums.length - 1) {
			return null;
		}
		const c = new Comment(this.invokeCallbacks);
		this.comments.push(c);
		c.label = this.getChar();

		this.invokeCallbacks();
		return c;
	}

	public removeComment(comment: Comment) {
		const i = this.comments.indexOf(comment);
		if (i < 0) {
			return;
		}
		this.comments.slice(i, 1);
		this.invokeCallbacks();
	}

	private invokeCallbacks = () => {
		this.callbacks.forEach((cb) => cb(this.allComments()));
	};

	private commentIndex() {
		return this.comments.length - 1;
	}

	private getChar() {
		return Nums.getChar(this.commentIndex());
	}
}

class Tabs {
	private _tab = SYNTACKS_TABS.PASTE_YOUR_CODE;

	constructor(private tabcallbacks: TabCallback[]) {}

	public set tab(t: SYNTACKS_TABS) {
		this._tab = t;
		this.tabcallbacks.forEach((cb) => cb(t));
	}

	public get tab() {
		return this._tab;
	}
}

type CommentCallback = (comments: Comment[]) => void;
type TabCallback = (tab: SYNTACKS_TABS) => void;

class Syntacks {
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

function createSyntacks() {
	let syntacks: Syntacks;
	return () => {
		if (!syntacks) {
			syntacks = new Syntacks();
		}

		useEffect(() => () => syntacks.disconnect(), []);

		return syntacks;
	};
}

const SyntacksContext = React.createContext<Syntacks | undefined>(undefined);
export const useInitializeSyntacks = createSyntacks();
export const SyntacksProvider = SyntacksContext.Provider;
export function useSyntacks() {
	const context = useContext(SyntacksContext);

	if (!context) {
		throw new Error("Failed to create Syntacks Context. Was it initalized?");
	}
	return context;
}
