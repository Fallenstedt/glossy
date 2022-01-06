import CodeMirror from "codemirror";

interface CommentOpts {
	callout: HTMLElement;
	content: string;
	onCommentUpdate: () => void;
}

type Bookmark = CodeMirror.TextMarker<CodeMirror.Position>;

export class Comment {
	public readonly id: string = new Date().toISOString();
	public bookmark?: Bookmark;
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

	public setDataValue(nextVal: string) {
		this._callout.querySelector("i")?.setAttribute("data-value", nextVal);
	}

	public calloutExists() {
		return document.body.contains(this._callout);
	}

	public delete() {
		this.bookmark?.clear();
		this.onCommentUpdate();
	}
}
