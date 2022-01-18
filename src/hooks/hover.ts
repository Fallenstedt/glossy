import { useEffect, useState } from "react";

export function useHover(element: HTMLElement | null) {
	const [hovering, setHovering] = useState(false);

	useEffect(() => {
		const setIsHovering = () => {
			if (!hovering) {
				setHovering(true);
			}
		};

		const setLeaving = () => {
			if (hovering) {
				setHovering(false);
			}
		};

		element?.addEventListener("mouseover", setIsHovering);
		element?.addEventListener("mouseleave", setLeaving);

		return () => {
			element?.removeEventListener("mouseenter", setIsHovering);
			element?.removeEventListener("mouseleave", setLeaving);
		};
	}, [element, hovering, setHovering]);

	return { hovering };
}

export function useRefHover(element: React.RefObject<HTMLDivElement>) {
	const [hovering, setHovering] = useState(false);

	useEffect(() => {
		if (!element.current) {
			return;
		}
		const el = element.current;

		const setIsHovering = () => {
			if (!hovering) {
				setHovering(true);
			}
		};

		const setLeaving = () => {
			if (hovering) {
				setHovering(false);
			}
		};

		el.addEventListener("mouseover", setIsHovering);
		el.addEventListener("mouseleave", setLeaving);

		return () => {
			if (el) {
				el.removeEventListener("mouseenter", setIsHovering);
				el.removeEventListener("mouseleave", setLeaving);
			}
		};
	}, [element, hovering, setHovering]);

	return { hovering };
}
