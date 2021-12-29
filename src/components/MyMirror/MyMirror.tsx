import "./my-mirror.css";
import { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import { ModeSelect } from "../ModeSelect/ModeSelect";
import { useSyntacks } from "../../providers/syntacks";
import { OrderedListOfComments } from "../Comments/Comments";

// https://stackoverflow.com/questions/21643872/how-to-change-the-mode-of-the-codemirror-editor-based-on-selected-value-in-selec

function useLoadMyMirror(container: React.RefObject<HTMLDivElement>) {
	const [myMirror, setMyMirror] = useState<CodeMirror.Editor | null>(null);
	useEffect(() => {
		if (container.current && !myMirror) {
			const value = `const array = [15, 16, 17, 18, 19];

function reducer(previous, current, index, array) {
	const returns = previous + current;
	console.log(
				\`previous: \${previous},  
				  current: \${current}, index: \${index}, 
				  returns: \${returns}\`
				);
	return returns;
}

array.reduce(reducer);
`;
			const m = CodeMirror(container.current, {
				value: value,
				mode: "javascript",
			});

			setMyMirror(m);
		}
	}, [container, myMirror]);
	return myMirror;
}

function useAddComment(mymirror: CodeMirror.Editor | null) {
	const syntacks = useSyntacks();

	useEffect(() => {
		if (!mymirror) {
			return;
		}

		let movedByMouse = false;

		mymirror.on("mousedown", () => {
			movedByMouse = true;
		});

		mymirror.on("keydown", () => {
			movedByMouse = false;
		});

		mymirror.on("beforeChange", () => {
			movedByMouse = false;
		});

		mymirror.on("cursorActivity", (e: CodeMirror.Editor) => {
			if (movedByMouse) {
				const doc = e.getDoc();
				const cursor = doc.getCursor();
				const line = doc.getLine(cursor.line); // get the line contents
				if (!line.length) {
					return;
				}
				const success = syntacks.comments.addComment();
				if (!success) {
					return;
				}

				doc.replaceRange(
					`${line} ${syntacks.comments.getChar()}`,
					{
						ch: 0,
						line: cursor.line,
					},
					{
						ch: line.length,
						line: cursor.line,
					}
				);
			}
		});
	}, [mymirror, syntacks]);
}

export function MyMirror() {
	const container = useRef<HTMLDivElement>(null);
	const mymirror = useLoadMyMirror(container);
	useAddComment(mymirror);

	return (
		<>
			<div className="syntacks">
				<ModeSelect />
				<div ref={container} className="code-container" />
			</div>
			<OrderedListOfComments />
		</>
	);
}
