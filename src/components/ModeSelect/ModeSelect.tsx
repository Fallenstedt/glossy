import { DropDown } from "../common/DropDown";

export interface ModeSelectProps {
	currentMode: string;
	modes: string[];
	onModeChange: (t: string) => void;
}

export function ModeSelect(props: ModeSelectProps) {
	return (
		<DropDown
			onChange={props.onModeChange}
			options={props.modes}
			current={props.currentMode}
			title={"Language"}
		/>
	);
}
