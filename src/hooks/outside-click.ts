import React, { useEffect } from "react";

export function useOutsideAlerter(
	ref: React.MutableRefObject<any>,
	onOutsideClick: () => void
) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				onOutsideClick();
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onOutsideClick, ref]);
}
