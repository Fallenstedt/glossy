import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Label } from "./Font";
import { classNames } from "../../util/classnames";

export interface DropDownProps {
	title: string;
	current: string;
	options: string[];
	onChange: (t: string) => void;
	className?: string;
}

export function DropDown(props: DropDownProps) {
	return (
		<div className={`flex flex-col w-full sm:w-auto ${props.className}`}>
			<Label
				htmlFor={props.title}
				className="block text-sm font-medium text-gray-700"
			>
				{props.title}
			</Label>

			<Menu as="div" className="relative inline-block text-left z-20">
				<div>
					<Menu.Button className="inline-flex justify-between w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
						{props.current}
						<ChevronDownIcon
							className="-mr-1 ml-2 h-5 w-5"
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items
						className="hover:cursor-pointer origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
						style={{
							maxHeight: "400px",
							overflowY: "scroll",
						}}
					>
						<div className="py-1">
							{props.options.map((option) => {
								return (
									<Menu.Item key={option}>
										{({ active }) => (
											<option
												onClick={(e) => {
													e.preventDefault();
													props.onChange(e.currentTarget.value);
												}}
												className={classNames(
													"hover:cursor-pointer",
													active
														? "bg-gray-100 text-gray-900"
														: "text-gray-700",
													"block px-4 py-2 text-sm"
												)}
											>
												{option}
											</option>
										)}
									</Menu.Item>
								);
							})}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
