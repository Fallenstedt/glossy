import download from "downloadjs";
import { toPng } from "html-to-image";
import { Tab } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
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
import { ColorPick } from "../ColorPick/ColorPick";
import { Button } from "../common/Button";
import { DownloadIcon } from "@heroicons/react/solid";
import { LineNumbers } from "../LineNumbers/LineNumbers";

function RenderPrepare() {
	const mymirror = useMirror();
	const [theme, onThemeChange] = useMirrorTheme(mymirror);
	const [mode, onModeChange] = useMirrorMode(mymirror);

	return (
		<div className="flex flex-col md:flex-row flex-wrap items-baseline gap-x-5 gap-y-2 md:gap-y-0 pb-4">
			<ThemeSelect
				themes={CODE_MIRROR_THEMES}
				currentTheme={theme}
				onThemeChange={onThemeChange}
				className={"z-30"}
			/>
			<ModeSelect
				modes={CODE_MIRROR_MODES}
				currentMode={mode}
				onModeChange={onModeChange}
			/>
			<ColorPick />
			<LineNumbers />
		</div>
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
					message = `You can add ${remainingComments} more callout.`;
					break;
				default:
					message = `You can add ${remainingComments} more callouts.`;
					break;
			}

			setRemainingComments(message);
		});

		return () => unsubscribe();
	}, [callouts]);

	return (
		<div className="pb-4 pt-2 md:pb-0">
			<Label htmlFor="">Add Callouts</Label>
			<SmallText>Add a callout by clicking code. {remainingComments}</SmallText>
		</div>
	);
}

function RenderExport() {
	const [loading, setLoading] = useState(false);
	const callouts = useCallouts();

	const exportImage = useCallback(() => {
		const region = document.getElementById("export-region");
		if (!region) {
			alert("Something went wrong. Devs have been notified");
			return;
		}

		setLoading(true);
		const borderClass = callouts.comments.allComments().length
			? "rounded-t-md"
			: "rounded-md";
		region.classList.add(borderClass, "overflow-hidden");

		toPng(region)
			.then((dataUrl) => {
				download(dataUrl, "callouts.png");
			})
			.then(() => {
				region.classList.remove(borderClass, "overflow-hidden");
			})
			.catch((err) => {
				console.error(err);
				region.classList.remove(borderClass, "overflow-hidden");
			})
			.finally(() => {
				setLoading(false);
			});
	}, [callouts.comments]);

	return (
		<div className="flex flex-col gap-y-4 md:flex-row md:gap-y-0 gap-x-7 pb-4 md:pb-0">
			<div>
				<Label htmlFor="">Download</Label>
				<div className="flex flex-wrap flex-row gap-x-5">
					<Button
						disabled={loading}
						onClick={exportImage}
						className="flex flex-row items-center justify-center"
					>
						<span>
							<DownloadIcon className="h-5" />
						</span>{" "}
						<SmallText>PNG</SmallText>
					</Button>

					<Button
						disabled={true}
						onClick={() => {}}
						className="flex flex-row items-center justify-center"
					>
						<SmallText>Markdown (Coming Soon)</SmallText>
					</Button>
				</div>
			</div>
			<div>
				<Label htmlFor="">Social</Label>
				<div className="flex flex-wrap flex-row gap-x-5">
					<Button
						disabled={true}
						onClick={() => {}}
						className="flex flex-row items-center justify-center"
					>
						<SmallText>Twitter (Coming Soon)</SmallText>
					</Button>
				</div>
			</div>
		</div>
	);
}

export function Tabs(props: TabsProps) {
	const [steps] = useState([
		CALLOUT_TABS.PASTE_YOUR_CODE,
		CALLOUT_TABS.ANNOTATE,
		CALLOUT_TABS.EXPORT,
	]);

	return (
		<div className="shadow rounded-t-md bg-white px-10 pt-5 mt-10">
			<Tab.Group
				onChange={(i: number) =>
					props.onChange(steps[i] ?? CALLOUT_TABS.UNKNOWN)
				}
			>
				<Tab.List className="flex flex-col md:flex-row p-1 space-x-1 bg-zinc-300/20 rounded-xl mb-2">
					<TabItem>{steps[0]}</TabItem>
					<TabItem>{steps[1]}</TabItem>
					<TabItem>{steps[2]}</TabItem>
				</Tab.List>
				<Tab.Panels className={"h-auto"}>
					<TabPanel>{RenderPrepare()}</TabPanel>
					<TabPanel>{RenderAnnotate()}</TabPanel>
					<TabPanel>{RenderExport()}</TabPanel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
