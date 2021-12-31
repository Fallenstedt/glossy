import React, { useContext } from "react";
import { useEffect } from "react";

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
	constructor(private _content: string = "", private _label: string = "") {}

	public set content(c: string) {
		this._content = c;
	}

	public get content() {
		return this._content;
	}

	public set label(c: string) {
		this._label = c;
	}

	public get label() {
		return this._label;
	}
}

class Comments {
	constructor(private readonly callbacks: SyntacksCallback[]) {}

	private readonly comments: Comment[] = [];

	public allComments(): Comment[] {
		return this.comments.slice();
	}

	public commentNo() {
		return this.comments.length - 1;
	}

	public getChar() {
		return Nums.getChar(this.commentNo());
	}

	public addComment(): boolean {
		if (this.commentNo() === Nums.nums.length - 1) {
			return false;
		}
		const c = new Comment();
		this.comments.push(c);
		c.label = this.getChar();

		this.invokeCallbacks();
		return true;
	}

	public removeComment(comment: Comment) {
		const i = this.comments.indexOf(comment);
		if (i < 0) {
			return;
		}
		this.comments.slice(i, 1);
		this.invokeCallbacks();
	}

	private invokeCallbacks() {
		this.callbacks.forEach((cb) => cb(this.allComments()));
	}
}

type SyntacksCallback = (comments: Comment[]) => void;
class Syntacks {
	public readonly callbacks: SyntacksCallback[] = [];
	public readonly comments = new Comments(this.callbacks);

	public onCommentsUpdate(callback: (comments: Comment[]) => void) {
		this.callbacks.push(callback);
		callback(this.comments.allComments());

		return () => {
			const i = this.callbacks.indexOf(callback);
			if (i > -1) {
				this.callbacks.splice(i, 1);
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
		throw new Error("Failed to create Dashboard Context. Was it initalized?");
	}
	return context;
}
