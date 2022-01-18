import "./App.css";
import { Container } from "./components/common/Container";
import { H1, LargeText } from "./components/common/Font";
import { Header } from "./components/Header/Header";
import { MyMirror } from "./components/MyMirror/MyMirror";
import { NavBar } from "./components/NavBar/NavBar";
import {
	CalloutsProvider,
	useInitializeCallouts,
} from "./hooks/callouts/callouts";

function App() {
	const callouts = useInitializeCallouts();

	return (
		<CalloutsProvider value={callouts}>
			<Container>
				<Header>
					<NavBar />
				</Header>
				<MyMirror />
			</Container>
		</CalloutsProvider>
	);
}

export default App;
