import { DropDown } from "../common/DropDown";

export interface ThemeSelectProps {
	currentTheme: string;
	themes: string[];
	onThemeChange: (t: string) => void;
	className?: string;
}

export function ThemeSelect(props: ThemeSelectProps) {
	return (
		<DropDown
			className={props.className}
			onChange={props.onThemeChange}
			options={props.themes}
			current={props.currentTheme}
			title={"Theme"}
		/>
	);
}
