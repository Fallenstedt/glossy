import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { useListenForCodeContainerHover, useMirror } from "../../hooks/mirror";
import { classNames } from "../../util/classnames";
import { FOCUS_RING_CLASS } from "../../util/constants";

interface CodeButtonProps {
	children: React.ReactNode;
}
export function CodeButton(props: CodeButtonProps) {
	const mirror = useMirror();
	const callouts = useCallouts();
	const [light, setIsLight] = useState(false);
	const hovering = useListenForCodeContainerHover(mirror);

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
			<button
				className={classNames(
					`inline-flex justify-between items-center px-2 rounded-md text-xs font-inter-light text-gray-700 hover:bg-gray-50 ${FOCUS_RING_CLASS}`,
					light ? "" : "inverted",
					"h-5"
				)}
			>
				{props.children}
			</button>
		</Transition>
	);
}
