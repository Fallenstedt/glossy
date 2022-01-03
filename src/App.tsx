import "./App.css";
import { Container } from "./components/common/Container";
import { H1, LargeText } from "./components/common/Font";
import { MyMirror } from "./components/MyMirror/MyMirror";
import {
	CalloutsProvider,
	useInitializeCallouts,
} from "./hooks/callouts/callouts";

function App() {
	const callouts = useInitializeCallouts();

	return (
		<CalloutsProvider value={callouts}>
			<Container>
				<header className="text-center">
					<H1>Callouts 📣</H1>
					<LargeText>Document and prettify your source code.</LargeText>
				</header>
				<MyMirror />
			</Container>
		</CalloutsProvider>
	);
}

export default App;
