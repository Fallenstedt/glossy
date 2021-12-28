import "./App.css";
import { MyMirror } from "./components/MyMirror";

function App() {
	return (
		<div className="app">
			<header></header>
			<select onChange={(e) => console.log(e.currentTarget.value)}>
				<option value="javascript">javascript</option>
				<option value="html">html</option>
			</select>
			<MyMirror />
		</div>
	);
}

export default App;
