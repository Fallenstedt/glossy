import "./comments.css";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { Comment } from "../../hooks/callouts/comment";
import { SmallText } from "../common/Font";
import { CALLOUT_MODE } from "../../util/constants";
import { useRefHover } from "../../hooks/hover";
import { Transition } from "@headlessui/react";
import { TinyButton } from "../common/TInyButton";

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

function useCurrentTab() {
	const callouts = useCallouts();
	const [tab, setTab] = useState(callouts.modes.tab);
	useEffect(() => {
		const unsubscribe = callouts.onTabUpdate((t) => setTab(t));

		return () => unsubscribe();
	}, [callouts]);

	return tab;
}

export function OrderedListOfComments() {
	const currentComments = useCurrentCallouts();
	const tab = useCurrentTab();

	const comments = currentComments
		.filter((comment) => comment.ghost === false)
		.map((comment) => {
			if (tab === CALLOUT_MODE.EXPORT) {
				return (
					<div className="flex flex-row items-start py-2" key={comment.id}>
						<div className="pt-1">
							<i className="conum mr-2" data-value={comment.getDataValue()}></i>
						</div>
						<SmallText>{comment.content}</SmallText>
					</div>
				);
			}
			return (
				<CommentBox key={comment.id} comment={comment}>
					{comment.content}
				</CommentBox>
			);
		});

	if (comments.length) {
		if (
			currentComments.every((comment) => comment.content.length === 0) &&
			tab === CALLOUT_MODE.EXPORT
		) {
			return null;
		} else {
			return <div className="rounded-b-md w-full">{comments}</div>;
		}
	} else {
		return null;
	}
}

interface CommentBoxProps {
	comment: Comment;
	children: React.ReactNode;
}

export function CommentBox(props: CommentBoxProps) {
	const commentControls = useRef<HTMLDivElement>(null);
	const commentTextArea = useRef<HTMLTextAreaElement>(null);
	const { hovering } = useRefHover(commentControls);
	const callouts = useCallouts();
	const updateComment = useCallback(
		(content: string) => {
			props.comment.content = content;
		},
		[props.comment]
	);

	const resizeTextArea = useCallback(() => {
		if (commentTextArea.current) {
			commentTextArea.current.style.height = "1px";
			commentTextArea.current.style.height =
				5 + commentTextArea.current.scrollHeight + "px";
		}
	}, [commentTextArea]);

	return (
		<div className="mt-1 px-4 md:px-0 " ref={commentControls}>
			<div className="flex flex-row justify-end w-full h-4 mb-4">
				<Transition
					show={hovering === true}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0"
					enterTo="transform opacity-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100"
					leaveTo="transform opacity-0"
				>
					<TinyButton
						className="bg-gray-200"
						onClick={() => {
							callouts.comments.removeComment(props.comment);
						}}
					>
						&#10005; Remove
					</TinyButton>
				</Transition>
			</div>
			<div className="mt-1 flex flex-row gap-x-2">
				<label
					htmlFor="about"
					className="font-inter-med block text-sm font-medium text-gray-700 mt-2"
				>
					<i className="conum" data-value={props.comment.getDataValue()}></i>
				</label>
				<textarea
					id={props.comment.id}
					name={props.comment.id}
					ref={commentTextArea}
					rows={3}
					onKeyUp={() => {
						resizeTextArea();
					}}
					onChange={(e) => updateComment(e.currentTarget.value)}
					value={props.comment.content}
					className="h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md font-inter-light p-2 resize-none"
					placeholder={"Brief description of this code"}
				/>
			</div>
		</div>
	);
}
