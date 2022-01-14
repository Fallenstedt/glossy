import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { FOCUS_RING_CLASS } from "../../util/constants";

function useInitializeDarkMode() {
	const [darkMode, setDarkMode] = useState(false);
	useEffect(() => {
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		if (prefersDark) {
			const htmltag = document.querySelector("html") as HTMLHtmlElement;
			const body = document.querySelector("body") as HTMLBodyElement;

			htmltag.classList.add("dark");
			body.classList.add("nightshade");
			setDarkMode(true);
		}
	}, []);

	return { darkMode, setDarkMode };
}

export function DarkModeButton() {
	const { darkMode, setDarkMode } = useInitializeDarkMode();

	const toggleDarkMode = useCallback(() => {
		const htmltag = document.querySelector("html") as HTMLHtmlElement;
		const body = document.querySelector("body") as HTMLBodyElement;

		const hasDark = htmltag.classList.contains("dark");
		hasDark ? htmltag.classList.remove("dark") : htmltag.classList.add("dark");
		hasDark
			? body.classList.remove("nightshade")
			: body.classList.add("nightshade");
		return !hasDark;
	}, []);

	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				const nextMode = toggleDarkMode();
				setDarkMode(nextMode);
			}}
			className={`absolute top-0 right-0 rounded w-10 h-10 p-1 m-2 hover:bg-gray-50 dark:hover:bg-gray-800 ${FOCUS_RING_CLASS}`}
		>
			{darkMode ? (
				<SunIcon className="stroke-baby-powder fill-gray-100" />
			) : (
				<MoonIcon className="stroke-gray-700 fill-gray-700" />
			)}
		</button>
	);
}
