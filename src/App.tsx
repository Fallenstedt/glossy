import logo from "./logo.svg";
import "./App.css";
// import "highlight.js/styles/github.css";
// import highlight from "highlight.js";
import { useEffect, useRef } from "react";
import CodeMirror from "codemirror";

// https://codemirror.net/doc/manual.html

function App() {
	const container = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (container.current) {
			const myMirror = CodeMirror(container.current);
		}
	}, []);
	return (
		<div className="app">
			<header></header>
			<div ref={container} className="code-container"></div>
		</div>
	);
}

export default App;
