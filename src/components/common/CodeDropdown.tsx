import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { useListenForCodeMirrorHover } from "../../hooks/mirror";
import { classNames } from "../../util/classnames";
import { FOCUS_RING_CLASS } from "../../util/constants";

export interface CodeDropDownProps {
	current: string;
	options: string[];
	onChange: (t: string) => void;
	className?: string;
}

export function CodeDropdown(props: CodeDropDownProps) {
	const hovering = useListenForCodeMirrorHover();
	const callouts = useCallouts();
	const [light, setIsLight] = useState(false);

	useEffect(() => {
		const unsubscribe = callouts.onThemeUpdate((l) => setIsLight(l));
		return () => {
			unsubscribe();
		};
	}, [callouts]);

	return (
		<Transition
			as={Fragment}
			show={hovering === true}
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0"
			enterTo="transform opacity-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100"
			leaveTo="transform opacity-0"
		>
			<div className={classNames("flex flex-col w-full sm:w-auto")}>
				<Menu as="div" className="relative inline-block text-left z-20">
					<Menu.Button
						className={classNames(
							`bg-gray-200 inline-flex justify-between items-center w-full px-2 rounded-md text-xs font-inter-light text-gray-700 hover:bg-gray-50 ${FOCUS_RING_CLASS}`,
							light ? "" : "inverted"
						)}
					>
						{props.current}
						<ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
					</Menu.Button>
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
							className="font-inter-light origin-top absolute left-0 mt-2 w-full sm:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
		</Transition>
	);
}
