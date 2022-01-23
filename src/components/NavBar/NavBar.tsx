import { ExternalLinkIcon } from "@heroicons/react/solid";
import download from "downloadjs";
import { toPng } from "html-to-image";
import { useCallback, useState } from "react";
import { useCallouts } from "../../hooks/callouts/callouts";
import { Link } from "../common/Button";
import { DropDown } from "../common/DropDown";

interface NavBarProps {}

export function NavBar(props: NavBarProps) {
	const [loading, setLoading] = useState(false);
	const callouts = useCallouts();
	console.log(loading);

	const exportImage = useCallback(() => {
		const region = document.getElementById("export-region");
		if (!region) {
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
		<nav className="flex flex-row justify-between gap-x-4 my-4 mx-4 md:mt-4 md:mb-8">
			<div className="h-8">
				<img
					className="object-cover h-8"
					src={`${process.env.PUBLIC_URL}/Glossy.png`}
					alt="Glossy logo"
				/>
			</div>
			<div className="flex flex-row gap-x-1">
				<Link link="https://docs.google.com/forms/d/e/1FAIpQLSe5Z4xZ3-1JSQDPK4Mhp0IObPJniERuVqug-jFXf95K91wXJQ/viewform?usp=pp_url">
					<div className="flex justify-center items-center">
						Feedback
						<ExternalLinkIcon className="h-4 ml-2" />
					</div>
				</Link>
				<DropDown
					title=""
					current="Export"
					options={["PNG", "Markdown"]}
					onChange={(t) => {
						switch (t) {
							case "PNG":
								exportImage();
								break;
							case "Markdown":
								callouts.mirrorContent.export();
								break;
							default:
								break;
						}
					}}
				/>
			</div>
		</nav>
	);
}
