import "./comments.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSyntacks, Comment } from "../../hooks/syntacks";

function useCurrentComments() {
	const syntacks = useSyntacks();
	const [currentComments, setCurrentComments] = useState<Comment[]>(
		syntacks.comments.allComments()
	);
	useEffect(() => {
		syntacks.onCommentsUpdate((c) => setCurrentComments(c));
	}, [syntacks]);

	return currentComments;
}

export function OrderedListOfComments() {
	const currentComments = useCurrentComments();

	const comments = currentComments.map((comment) => (
		<ListItem key={comment.id} comment={comment}>
			{comment.content}
		</ListItem>
	));

	return <ul className="code-comments">{comments}</ul>;
}

interface ListItemProps {
	comment: Comment;
	children: React.ReactNode;
}

export function ListItem(props: ListItemProps) {
	const updateComment = useCallback(
		(content: string) => {
			props.comment.content = content;
		},
		[props.comment]
	);

	return (
		<li className="code-comment" data-num={props.comment.label}>
			<textarea
				onChange={(e) => updateComment(e.currentTarget.value)}
				className="code-textarea"
			></textarea>
		</li>
	);
}
