import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useMirror, useMirrorMode, useMirrorTheme } from "../../hooks/mirror";
import { useCallouts } from "../../hooks/callouts/callouts";
import {
	CODE_MIRROR_MODES,
	CODE_MIRROR_THEMES,
	CALLOUT_TABS,
} from "../../util/constants";
import { Label, SmallText } from "../common/Font";
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
	const callouts = useCallouts();
	const [remainingComments, setRemainingComments] = useState("");
	useEffect(() => {
		const unsubscribe = callouts.onCommentsUpdate(() => {
			const remainingComments = callouts.comments.remainingComments();
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
	}, [callouts]);

	return (
		<>
			<Label htmlFor="">Document Your Code</Label>
			<SmallText>Add a callout by clicking code.</SmallText>
			<SmallText>{remainingComments}</SmallText>
		</>
	);
}

export function Tabs(props: TabsProps) {
	const [steps] = useState([
		CALLOUT_TABS.PASTE_YOUR_CODE,
		CALLOUT_TABS.ANNOTATE,
		CALLOUT_TABS.EXPORT,
	]);

	return (
		<Tab.Group
			onChange={(i: number) => props.onChange(steps[i] ?? CALLOUT_TABS.UNKNOWN)}
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
