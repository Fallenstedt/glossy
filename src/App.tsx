import "./App.css";
import { MyMirror } from "./components/MyMirror/MyMirror";
import { SyntacksProvider, useInitializeSyntacks } from "./providers/syntacks";

function App() {
	const syntacks = useInitializeSyntacks();

	return (
		<SyntacksProvider value={syntacks}>
			<div className="app">
				<header>
					<h1 className="title">Syntacks 📌</h1>
					<p className="large-font">Document and prettify source code.</p>
					<p className="large-font">
						Paste your code in the textarea to get started.
					</p>
				</header>
				<MyMirror />
			</div>
		</SyntacksProvider>
	);
}

export default App;
