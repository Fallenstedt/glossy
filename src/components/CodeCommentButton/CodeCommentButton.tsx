import { PencilAltIcon, PencilIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { CALLOUT_MODE } from "../../util/constants";
import { CodeButton, CODE_BUTTON_ACTIVE } from "../common/CodeButton";

export function CodeCommentButton() {
	const callouts = useCallouts();
	const [active, setActive] = useState(false);
	useEffect(() => {
		const unsubscribe = callouts.onTabUpdate((tab) =>
			setActive(tab === CALLOUT_MODE.ANNOTATE)
		);

		return () => {
			unsubscribe();
		};
	}, [callouts]);

	return (
		<CodeButton
			onClick={() => {
				const currentTab = callouts.modes.tab;
				callouts.modes.tab =
					currentTab === CALLOUT_MODE.ANNOTATE
						? CALLOUT_MODE.PASTE_YOUR_CODE
						: CALLOUT_MODE.ANNOTATE;
			}}
			className={active ? CODE_BUTTON_ACTIVE : "bg-gray-200"}
		>
			Comment{" "}
			{active ? (
				<PencilAltIcon className="ml-1 h-3 w-3" aria-hidden="true" />
			) : (
				<PencilIcon className="ml-1 h-3 w-3" aria-hidden="true" />
			)}
		</CodeButton>
	);
}
