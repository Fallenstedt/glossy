import { DropDown } from "../common/DropDown";

export interface ThemeSelectProps {
	currentTheme: string;
	themes: string[];
	onThemeChange: (t: string) => void;
}

export function ThemeSelect(props: ThemeSelectProps) {
	return (
		<DropDown
			onChange={props.onThemeChange}
			options={props.themes}
			current={props.currentTheme}
			title={"Theme"}
		/>
	);
}
