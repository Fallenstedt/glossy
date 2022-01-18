import { Tab } from "@headlessui/react";
import { classNames } from "../../util/classnames";
import { FOCUS_RING_CLASS } from "../../util/constants";

export interface TabItemProps {
	children: React.ReactNode;
}
export function TabItem(props: TabItemProps) {
	return (
		<Tab
			className={({ selected }) =>
				classNames(
					"w-full py-2.5 text-sm leading-5 font-medium text-gray-700 dark:text-baby-powder rounded-lg",
					FOCUS_RING_CLASS,
					selected
						? "bg-white shadow dark:bg-day-shade"
						: "text-gray-500 dark:text-powder hover:bg-gray-400/[0.12] hover:text-gray-800"
				)
			}
		>
			{props.children}
		</Tab>
	);
}
