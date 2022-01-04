import { SketchPicker } from "react-color";
import { useState } from "react";

export function ColorPick() {
	const [color, setColor] = useState("#f9fafb");

	return (
		<SketchPicker color={color} onChange={(color) => setColor(color.hex)} />
	);
}
