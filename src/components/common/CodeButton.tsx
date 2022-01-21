import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { useListenForCodeMirrorHover } from "../../hooks/mirror";
import { classNames } from "../../util/classnames";
import { FOCUS_RING_CLASS } from "../../util/constants";
import { TinyButton } from "./TInyButton";

interface CodeButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
}

export const CODE_BUTTON_ACTIVE = "bg-orange-100";
export function CodeButton(props: CodeButtonProps) {
	const callouts = useCallouts();
	const [light, setIsLight] = useState(false);
	const hovering = useListenForCodeMirrorHover();

	useEffect(() => {
		const unsubscribe = callouts.onThemeUpdate((l) => setIsLight(l));
		return () => {
			unsubscribe();
		};
	}, [callouts]);

	return (
		<Transition
			show={hovering === true}
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0"
			enterTo="transform opacity-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100"
			leaveTo="transform opacity-0"
		>
			<TinyButton
				onClick={props.onClick}
				className={`${light ? "" : "inverted"} ${props.className ?? ""}`}
			>
				{props.children}
			</TinyButton>
		</Transition>
	);
}
