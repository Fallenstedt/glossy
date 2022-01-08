import { useCallback, useEffect, useState } from "react";
import { useMirror } from "../../hooks/mirror";
import { Label } from "../common/Font";
import { Toggle } from "../common/Toggle";

export function LineNumbers() {
	const mymirror = useMirror();
	const [toggled, setToggled] = useState(false);

	useEffect(() => {
		if (mymirror) {
			setToggled(mymirror.getOption("lineNumbers") ?? false);
		}
	}, [mymirror]);

	const toggleLineNumbers = useCallback(
		(next: boolean) => {
			if (mymirror) {
				mymirror.setOption("lineNumbers", next);
			}
			setToggled(next);
		},
		[mymirror]
	);

	return (
		<div className="flex flex-col">
			<Label className="text-sm font-medium text-gray-700" htmlFor="">
				Line Numbers
			</Label>
			<div className="py-2">
				<Toggle onChange={toggleLineNumbers} checked={toggled} />
			</div>
		</div>
	);
}
