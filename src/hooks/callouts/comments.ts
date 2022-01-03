import { Comment } from "./comment";
import { CommentCallback } from "./types";

export class Comments {
	public static max = 10;

	constructor(private readonly callbacks: CommentCallback[]) {}

	private readonly comments: Comment[] = [];

	public allComments(): Comment[] {
		return this.comments.slice();
	}

	public remainingComments() {
		return Comments.max - this.comments.length;
	}

	public addComment(): Comment | null {
		if (this.commentIndex() === Comments.max - 1) {
			return null;
		}
		const callout = this.createCallout(this.comments.length + 1);
		const c = new Comment({
			onCommentUpdate: this.invokeCallbacks,
			callout,
			content: "",
		});
		this.comments.push(c);

		this.invokeCallbacks();
		return c;
	}

	public removeComment(comment: Comment) {
		const i = this.comments.indexOf(comment);
		if (i < 0) {
			return;
		}
		comment.delete();
		this.comments.splice(i, 1);
		this.invokeCallbacks();
	}

	private invokeCallbacks = () => {
		this.callbacks.forEach((cb) => cb(this.allComments()));
	};

	private commentIndex() {
		return this.comments.length - 1;
	}

	private createCallout(num: number) {
		const el = document.createElement("i");
		el.className = "conum";
		el.setAttribute("data-value", num.toString());

		const msg = document.createElement("div");
		msg.appendChild(el);
		return msg;
	}
}
