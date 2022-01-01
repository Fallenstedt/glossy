import { useCallback, useEffect, useState } from "react";
import { useSyntacks, Comment } from "../../hooks/syntacks";

function useCurrentComments() {
	const syntacks = useSyntacks();
	const [currentComments, setCurrentComments] = useState<Comment[]>(
		syntacks.comments.allComments()
	);
	useEffect(() => {
		const unsubscribe = syntacks.onCommentsUpdate((c) => setCurrentComments(c));
		return () => unsubscribe();
	}, [syntacks]);

	return currentComments;
}

export function OrderedListOfComments() {
	const currentComments = useCurrentComments();

	const comments = currentComments.map((comment) => (
		<CommentBox key={comment.id} comment={comment}>
			{comment.content}
		</CommentBox>
	));

	return <div className="mt-10">{comments}</div>;
}

interface CommentBoxProps {
	comment: Comment;
	children: React.ReactNode;
}

export function CommentBox(props: CommentBoxProps) {
	const updateComment = useCallback(
		(content: string) => {
			props.comment.content = content;
		},
		[props.comment]
	);

	return (
		<div className="mt-5">
			<label
				htmlFor="about"
				className="block text-sm font-medium text-gray-700"
			>
				Comment {props.comment.label}
			</label>
			<div className="mt-1">
				<textarea
					id={props.comment.id}
					name={props.comment.id}
					rows={3}
					onChange={(e) => updateComment(e.currentTarget.value)}
					className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
					placeholder={""}
					defaultValue={""}
				/>
			</div>
			<p className="mt-2 text-sm text-gray-500">
				Brief description for your profile. URLs are hyperlinked.
			</p>
		</div>

		// <li className="code-comment" data-num={props.comment.label}>
		// 	<textarea
		// 		className="code-textarea"
		// 	></textarea>
		// </li>
	);
}
