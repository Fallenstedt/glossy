import { classNames } from "../../util/classnames";

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	disabled: boolean;
	className?: string;
}

export function Button(props: ButtonProps) {
	const className =
		"rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 active:bg-slate-200 transition-colors disabled:bg-slate-100";

	return (
		<button
			disabled={props.disabled}
			onClick={props.onClick}
			className={classNames(className, props.className ?? "")}
		>
			{props.children}
		</button>
	);
}

interface LinkProps {
	link: string;
	children: React.ReactNode;
}
export function Link(props: LinkProps) {
	return (
		<a
			className="rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 active:bg-slate-200 transition-colors disabled:bg-slate-100"
			target={"_blank"}
			href={props.link}
			rel="noreferrer"
		>
			{props.children}
		</a>
	);
}
