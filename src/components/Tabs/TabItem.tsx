import { Tab } from "@headlessui/react";
import { classNames } from "../../util/classnames";

export interface TabItemProps {
	children: React.ReactNode;
}
export function TabItem(props: TabItemProps) {
	return (
		<Tab
			className={({ selected }) =>
				classNames(
					"w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg",
					"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500",
					selected
						? "bg-white shadow"
						: "text-gray-500 hover:bg-gray-400/[0.12] hover:text-gray-800"
				)
			}
		>
			{props.children}
		</Tab>
	);
}
