import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useMirror, useMirrorMode, useMirrorTheme } from "../../hooks/mirror";
import { useSyntacks } from "../../hooks/syntacks";
import {
	CODE_MIRROR_MODES,
	CODE_MIRROR_THEMES,
	SYNTACKS_TABS,
} from "../../util/constants";
import { SmallText } from "../common/Font";
import { ModeSelect } from "../ModeSelect/ModeSelect";
import { ThemeSelect } from "../ThemeSelect/ThemeSelect";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TabsProps } from "./types";

function RenderPrepare() {
	const mymirror = useMirror();
	const [theme, onThemeChange] = useMirrorTheme(mymirror);
	const [mode, onModeChange] = useMirrorMode(mymirror);

	return (
		<>
			<div className="flex flex-row gap-x-5 mb-4">
				<ThemeSelect
					themes={CODE_MIRROR_THEMES}
					currentTheme={theme}
					onThemeChange={onThemeChange}
				/>
				<ModeSelect
					modes={CODE_MIRROR_MODES}
					currentMode={mode}
					onModeChange={onModeChange}
				/>
			</div>
		</>
	);
}

function RenderAnnotate() {
	const syntacks = useSyntacks();
	const [remainingComments, setRemainingComments] = useState("");
	useEffect(() => {
		const unsubscribe = syntacks.onCommentsUpdate(() => {
			const remainingComments = syntacks.comments.remainingComments();
			let message: string;
			switch (remainingComments) {
				case 0:
					message = "All comments added.";
					break;
				case 1:
					message = `You can add ${remainingComments} more comment.`;
					break;
				default:
					message = `You can add ${remainingComments} more comments.`;
					break;
			}

			setRemainingComments(message);
		});

		return () => unsubscribe();
	}, [syntacks]);

	return (
		<>
			<SmallText>
				Add anotations by clicking the lines of code that need explanation.
			</SmallText>
			<SmallText>{remainingComments}</SmallText>
		</>
	);
}

export function Tabs(props: TabsProps) {
	const [steps] = useState([
		SYNTACKS_TABS.PASTE_YOUR_CODE,
		SYNTACKS_TABS.ANNOTATE,
		SYNTACKS_TABS.EXPORT,
	]);

	return (
		<Tab.Group
			onChange={(i: number) =>
				props.onChange(steps[i] ?? SYNTACKS_TABS.UNKNOWN)
			}
		>
			<Tab.List className="flex p-1 space-x-1 bg-zinc-300/20 rounded-xl mb-2">
				<TabItem>{steps[0]}</TabItem>
				<TabItem>{steps[1]}</TabItem>
				<TabItem>{steps[2]}</TabItem>
			</Tab.List>
			<Tab.Panels>
				<TabPanel>{RenderPrepare()}</TabPanel>
				<TabPanel>{RenderAnnotate()}</TabPanel>
				<TabPanel>sup</TabPanel>
			</Tab.Panels>
		</Tab.Group>
	);
}