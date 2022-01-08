import { DropDown } from "../common/DropDown";

export interface ModeSelectProps {
	currentMode: string;
	modes: string[];
	onModeChange: (t: string) => void;
	className?: string;
}

export function ModeSelect(props: ModeSelectProps) {
	return (
		<DropDown
			className={props.className}
			onChange={props.onModeChange}
			options={props.modes}
			current={props.currentMode}
			title={"Language"}
		/>
	);
}
