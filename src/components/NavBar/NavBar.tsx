import download from "downloadjs";
import { toPng } from "html-to-image";
import { useCallback, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { DropDown } from "../common/DropDown";

interface NavBarProps {}

export function NavBar(props: NavBarProps) {
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
		<nav className="flex flex-row justify-between gap-x-4 my-4 mx-4 md:mt-4 md:mb-32">
			<div className="h-8">
				<img
					className="object-cover h-8"
					src={`${process.env.PUBLIC_URL}/Glossy.png`}
					alt="Glossy logo"
				/>
			</div>

			<DropDown
				title=""
				current="Export"
				options={["PNG", "Markdown"]}
				onChange={(t) => {
					if (t === "PNG") {
						exportImage();
					}
				}}
			/>
		</nav>
	);
}
