import { Switch } from "@headlessui/react";

interface MyToggleProps {
	onChange: (newvalue: boolean) => void;
	checked: boolean;
}

export function Toggle(props: MyToggleProps) {
	return (
		<Switch
			checked={props.checked}
			onChange={props.onChange}
			className={`${
				props.checked ? "bg-sky-600" : "bg-gray-200"
			} relative inline-flex items-center h-6 rounded-full w-11 `}
		>
			<span className="sr-only">Enable notifications</span>
			<span
				className={`${
					props.checked ? "translate-x-6" : "translate-x-1"
				} inline-block w-4 h-4 transform bg-white rounded-full transform transition ease-in-out duration-200`}
			/>
		</Switch>
	);
}
