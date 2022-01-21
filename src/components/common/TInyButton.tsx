import { classNames } from "../../util/classnames";
import { FOCUS_RING_CLASS } from "../../util/constants";

interface TinyButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
}

export function TinyButton(props: TinyButtonProps) {
	return (
		<button
			className={classNames(
				`inline-flex justify-between items-center px-2 rounded-md text-xs font-inter-light text-gray-700 hover:bg-gray-50 ${FOCUS_RING_CLASS}`,
				"h-5",
				props.className ? props.className : ""
			)}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
