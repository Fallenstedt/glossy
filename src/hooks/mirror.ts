import React, { useCallback, useContext, useEffect, useState } from "react";
import { CODE_MIRROR_DEFAULTS } from "../util/constants";

export const MirrorContext = React.createContext<CodeMirror.Editor | undefined>(
	undefined
);
export const MirrorProvider = MirrorContext.Provider;
export function useMirror() {
	const context = useContext(MirrorContext);
	// if (!context) {
	// 	throw new Error("Failed to create Mirror Context. Was it initalized?");
	// }
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
