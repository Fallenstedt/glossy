import { Comment } from "./comment";
import { CommentCallback } from "./types";

export class Comments {
	public static max = 10;
	public static enclosedAlphanumeric = [
		"\u2460",
		"\u2461",
		"\u2462",
		"\u2463",
		"\u2464",
		"\u2465",
		"\u2466",
		"\u2467",
		"\u2468",
		"\u2469",
	];

	constructor(private readonly callbacks: CommentCallback[]) {}

	private readonly comments: Comment[] = [];
	// todo pass this in with addComment
	private darkTheme: boolean = false;

	public allComments(): Comment[] {
		return this.comments.slice();
	}

	public latestComment(): Comment | null {
		return this.comments[this.comments.length - 1];
	}

	public remainingComments() {
		return Comments.max - this.comments.filter((c) => c.ghost === false).length;
	}

	public addComment(): Comment | null {
		if (this.comments.length === Comments.max) {
			console.log("MAX");
			return null;
		}
		const callout = this.createCallout(this.comments.length + 1);
		const c = new Comment({
			onCommentUpdate: this.invokeCallbacks,
			callout,
			content: "",
			ghost: true,
		});
		this.comments.push(c);
		this.invokeCallbacks();
		return c;
	}

	public refreshComments() {
		this.allComments().forEach((c) => {
			if (!c.calloutExists()) {
				this.removeComment(c);
			}
		});
	}

	public removeComment(comment: Comment) {
		const i = this.comments.indexOf(comment);
		if (i < 0) {
			return;
		}
		// remove from mirror
		comment.delete();

		// remove from comments array
		this.comments.splice(i, 1);

		// decrement each comment from the deleted index
		const decrement = this.comments.slice(i);
		decrement.forEach((c) => {
			c.setDataValue(String(Number(c.getDataValue()) - 1));
		});

		// announce channges
		this.invokeCallbacks();
	}

	private invokeCallbacks = () => {
		this.callbacks.forEach((cb) => cb(this.allComments()));
	};

	public makeCommentsDark() {
		this.comments.forEach((comment) => {
			comment.removeInvertFilter();
		});
		this.darkTheme = false;
	}

	public makeCommentsBright() {
		this.comments.forEach((comment) => {
			comment.addInvertFilter();
		});
		this.darkTheme = true;
	}

	public removeAllComments() {
		for (let i = 0; i < this.comments.length; i++) {
			this.comments[i].delete();
		}
	}

	private createCallout(num: number) {
		const el = document.createElement("i");
		el.className = `conum conum-ghost ${this.darkTheme ? "invert" : ""}`;
		el.setAttribute("data-value", num.toString());

		const msg = document.createElement("span");
		msg.appendChild(el);
		return msg;
	}
}
