import { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";

// https://stackoverflow.com/questions/21643872/how-to-change-the-mode-of-the-codemirror-editor-based-on-selected-value-in-selec

function useLoadMyMirror(container: React.RefObject<HTMLDivElement>) {
	const [myMirror, setMyMirror] = useState<CodeMirror.Editor | null>(null);
	useEffect(() => {
		if (container.current && !myMirror) {
			const m = CodeMirror(container.current, {
				value: "var a = foo",
				lineNumbers: true,
				mode: "javascript",
			});
			setMyMirror(m);
		}
	}, [container, myMirror]);
	return myMirror;
}

export function MyMirror() {
	const container = useRef<HTMLDivElement>(null);
	useLoadMyMirror(container);

	return <div ref={container} className="code-container"></div>;
}
