import CodeMirror from "codemirror";

interface CommentOpts {
	callout: HTMLElement;
	content: string;
	onCommentUpdate: () => void;
}

export class Comment {
	public readonly id: string = new Date().toISOString();
	public widget?: CodeMirror.LineWidget;
	private onCommentUpdate: () => void;
	private _content: string = "";
	private _callout: HTMLElement;

	constructor(opts: CommentOpts) {
		this._content = opts.content;
		this._callout = opts.callout;
		this.onCommentUpdate = opts.onCommentUpdate;
	}

	public set content(c: string) {
		this._content = c;
		this.onCommentUpdate();
	}

	public get content() {
		return this._content;
	}

	public set callout(c: HTMLElement) {
		this._callout = c;
		this.onCommentUpdate();
	}

	public get callout() {
		return this._callout;
	}

	public getDataValue() {
		return this._callout.querySelector("i")?.getAttribute("data-value");
	}

	public delete() {
		this.widget?.clear();
		this.onCommentUpdate();
	}
}
