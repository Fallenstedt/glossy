import { useColor } from "../../hooks/color";
import { classNames } from "../../util/classnames";

interface ColorBackgroundProps {
	children: React.ReactNode;
	className?: string;
}

export function ColorBackground(props: ColorBackgroundProps) {
	const color = useColor();

	return (
		<div
			className={classNames("shadow p-10", props.className ?? "")}
			style={{ backgroundColor: color.color }}
		>
			{props.children}
		</div>
	);
}
