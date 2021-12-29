import "./mode-select.css";

export function ModeSelect() {
	return (
		<div className="mode-select">
			<select onChange={(e) => console.log(e.currentTarget.value)}>
				<option value="javascript">javascript</option>
				<option value="html">html</option>
			</select>
		</div>
	);
}
