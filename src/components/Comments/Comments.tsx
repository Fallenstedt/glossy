import "./comments.css";
import { useCallback, useEffect, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { Comment } from "../../hooks/callouts/comment";
import { HelpText } from "../common/Font";

function useCurrentCallouts() {
	const callouts = useCallouts();
	const [currentComments, setCurrentComments] = useState<Comment[]>(
		callouts.comments.allComments()
	);
	useEffect(() => {
		const unsubscribe = callouts.onCommentsUpdate((c) => setCurrentComments(c));
		return () => unsubscribe();
	}, [callouts]);

	return currentComments;
}

export function OrderedListOfComments() {
	const currentComments = useCurrentCallouts();

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
	const callouts = useCallouts();
	const updateComment = useCallback(
		(content: string) => {
			props.comment.content = content;
		},
		[props.comment]
	);

	return (
		<div className="mt-5">
			<div className="flex flex-row justify-between">
				<label
					htmlFor="about"
					className="font-inter-med block text-sm font-medium text-gray-700"
				>
					Comment{" "}
					<i className="conum" data-value={props.comment.getDataValue()}></i>
				</label>
				<button
					className="font-inter-light text-sm text-blue-700"
					onClick={(e) => {
						e.preventDefault();
						callouts.comments.removeComment(props.comment);
					}}
				>
					&#10005; Remove
				</button>
			</div>
			<div className="mt-1">
				<textarea
					id={props.comment.id}
					name={props.comment.id}
					rows={3}
					onChange={(e) => updateComment(e.currentTarget.value)}
					value={props.comment.content}
					className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md font-inter-light p-2"
					placeholder={""}
				/>
			</div>
			<HelpText>Brief description of this code.</HelpText>
		</div>
	);
}
