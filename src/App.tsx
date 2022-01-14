import "./App.css";
import { Container } from "./components/common/Container";
import { H1, LargeText } from "./components/common/Font";
import { DarkModeButton } from "./components/DarkModeButton/DarkModeButton";
import { Header } from "./components/Header/Header";
import { MyMirror } from "./components/MyMirror/MyMirror";
import {
	CalloutsProvider,
	useInitializeCallouts,
} from "./hooks/callouts/callouts";

function App() {
	const callouts = useInitializeCallouts();

	return (
		<CalloutsProvider value={callouts}>
			<DarkModeButton />
			<Container>
				<Header>
					<H1>Glossy</H1>
					<LargeText>Document and prettify your source code.</LargeText>
				</Header>
				<MyMirror />
			</Container>
		</CalloutsProvider>
	);
}

export default App;
