import "./App.css";
import { Container } from "./components/common/Container";
import { H1, LargeText } from "./components/common/Font";
import { MyMirror } from "./components/MyMirror/MyMirror";
import { SyntacksProvider, useInitializeSyntacks } from "./hooks/syntacks";

function App() {
	const syntacks = useInitializeSyntacks();

	return (
		<SyntacksProvider value={syntacks}>
			<Container>
				<header className="text-center">
					<H1>Syntacks 📌</H1>
					<LargeText>Document and prettify your source code.</LargeText>
				</header>
				<MyMirror />
			</Container>
		</SyntacksProvider>
	);
}

export default App;
