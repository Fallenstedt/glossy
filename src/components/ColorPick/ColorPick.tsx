import { SketchPicker } from "react-color";
import { useRef, useState } from "react";
import { Label } from "../common/Font";
import { useColor } from "../../hooks/color";
import { useOutsideAlerter } from "../../hooks/outside-click";

export function ColorPick() {
	const wrapper = useRef(null);
	const { color, setColor } = useColor();
	const [open, setOpen] = useState(false);
	useOutsideAlerter(wrapper, () => {
		setOpen(false);
	});

	return (
		<div ref={wrapper} className="relative">
			<PanelButton color={color} onClick={() => setOpen(!open)}>
				Color
			</PanelButton>
			{open && (
				<div className="z-30 absolute">
					<SketchPicker
						color={color}
						onChange={(color) => setColor(color.hex)}
					/>
				</div>
			)}
		</div>
	);
}

interface PanelButtonProps {
	onClick: () => void;
	color: string;
	children: React.ReactNode;
}

export function PanelButton(props: PanelButtonProps) {
	return (
		<div className="flex flex-col">
			<Label htmlFor={"color"} className="text-sm font-medium text-gray-700">
				Color
			</Label>
			<button
				name="color"
				onClick={props.onClick}
				className="border w-10 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
				style={{ background: props.color }}
			>
				<span style={{ color: "transparent" }}>Color</span>
				<div style={{ backgroundColor: props.color }}></div>
			</button>
		</div>
	);
}
