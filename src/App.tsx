import "./App.css";
import { Container } from "./components/common/Container";
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
			<NavBar />
			<Container>
				{/* <Header></Header> */}
				<MyMirror />
			</Container>
		</CalloutsProvider>
	);
}

export default App;
