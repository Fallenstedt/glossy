import React, { useCallback, useContext, useState } from "react";
import { CODE_MIRROR_DEFAULTS } from "../util/constants";

export const MirrorContext = React.createContext<CodeMirror.Editor | undefined>(
	undefined
);
export const MirrorProvider = MirrorContext.Provider;
export function useMirror() {
	const context = useContext(MirrorContext);

	return context;
}

export function useMirrorTheme(
	mymirror: CodeMirror.Editor | undefined
): [string, (t: string) => void] {
	const [theme, setTheme] = useState<string>(CODE_MIRROR_DEFAULTS.THEME);

	const onThemeSelect = useCallback(
		(newtheme: string) => {
			if (!mymirror) {
				return;
			}

			mymirror.setOption("theme", newtheme);
			setTheme(newtheme);
			const el = document.querySelector(".CodeMirror") as HTMLDivElement;
			if (el) {
				const s = window.getComputedStyle(el);

				const background = s.backgroundColor;
				console.log({ background });
			}
		},
		[mymirror]
	);

	return [theme, onThemeSelect];
}

export function useMirrorMode(
	mymirror: CodeMirror.Editor | undefined
): [string, (t: string) => void] {
	const [mode, setMode] = useState<string>(CODE_MIRROR_DEFAULTS.MODE);

	const onModeSelect = useCallback(
		(newmode: string) => {
			if (!mymirror) {
				return;
			}

			mymirror.setOption("mode", newmode);

			setMode(newmode);
		},
		[mymirror]
	);

	return [mode, onModeSelect];
}
