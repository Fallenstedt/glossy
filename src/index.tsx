import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
