export class MirrorContent {
	private getMirrorValueFn: (() => string) | null = null;
	private getTitleValueFn: (() => string) | null = null;
	private getCommentsFn: (() => string[]) | null = null;

	public commentsFn(n: () => string[]) {
		this.getCommentsFn = n;

		return () => (this.getCommentsFn = null);
	}

	public titleFn(n: () => string) {
		this.getTitleValueFn = n;

		return () => (this.getTitleValueFn = null);
	}

	public mirrorValueFn(n: () => string) {
		this.getMirrorValueFn = n;

		return () => (this.getMirrorValueFn = null);
	}

	public exportAsMarkdown() {
		const title = this.getTitleValueFn?.() ?? "";
		const mirrorContent = this.getMirrorValueFn?.() ?? "";
		const comments = this.getCommentsFn?.() ?? [];

		const content = `
## ${title}

\`\`\`
${mirrorContent}
\`\`\`

${comments
	.map((comment, i) => {
		return `${i + 1}. ${comment}`;
	})
	.join("\n")}
`;

		navigator.clipboard.writeText(content);
	}
}
