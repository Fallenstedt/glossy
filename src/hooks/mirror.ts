import React, { useCallback, useContext, useEffect, useState } from "react";
import { CALLOUT_TABS, CODE_MIRROR_DEFAULTS } from "../util/constants";
import { useCallouts } from "./callouts/callouts";
import { Comment } from "../hooks/callouts/comment";
import CodeMirror from "codemirror";

export const MirrorContext = React.createContext<CodeMirror.Editor | undefined>(
	undefined
);
export const MirrorProvider = MirrorContext.Provider;
export function useMirror() {
	const context = useContext(MirrorContext);

	return context;
}

export function useListenForCodeContainerHover(
	mymirror: CodeMirror.Editor | undefined
) {
	const [hovering, setHovering] = useState(false);
	useEffect(() => {
		if (!mymirror) {
			return;
		}

		const codeContainer = document.getElementById("code-container");
		if (!codeContainer) {
			return;
		}
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

		codeContainer.addEventListener("mouseover", setIsHovering);
		codeContainer.addEventListener("mouseleave", setLeaving);

		return () => {
			codeContainer.removeEventListener("mouseenter", setIsHovering);
			codeContainer.removeEventListener("mouseleave", setLeaving);
		};
	}, [mymirror, hovering, setHovering]);

	return hovering;
}

export function useMirrorTheme(mymirror: CodeMirror.Editor | undefined) {
	const [theme, setTheme] = useState<string>(CODE_MIRROR_DEFAULTS.THEME);
	const callouts = useCallouts();
	const onThemeSelect = useCallback(
		(newtheme: string) => {
			if (!mymirror) {
				return;
			}

			mymirror.setOption("theme", newtheme);
			setTheme(newtheme);
			callouts.textColorInverter.setIsLight();
		},
		[mymirror, callouts]
	);

	return { theme, onThemeSelect };
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

			if (newmode === "typescript") {
				mymirror.setOption("mode", "text/typescript");
			} else {
				mymirror.setOption("mode", newmode);
			}

			setMode(newmode);
		},
		[mymirror]
	);

	return [mode, onModeSelect];
}

export function useGhost(mymirror: CodeMirror.Editor | undefined) {
	const callouts = useCallouts();

	useEffect(() => {
		if (!mymirror) {
			return;
		}

		function removeGhostOnMouseLeave(mymirror: CodeMirror.Editor) {
			const el = mymirror.getWrapperElement();

			const onMouseLeave = (e: MouseEvent) => {
				const latest = callouts.comments.latestComment();
				if (latest && latest.ghost === true) {
					callouts.comments.removeComment(latest);
				}
			};

			el.addEventListener("mouseleave", onMouseLeave);

			return () => {
				el.removeEventListener("mouseleave", onMouseLeave);
			};
		}

		function removeLatestGhostOnTabChange() {
			const removeGhost = (tab: CALLOUT_TABS) => {
				if (tab !== CALLOUT_TABS.ANNOTATE) {
					// remove the ghost comment if there is one
					const latest = callouts.comments.latestComment();
					if (latest && latest.ghost === true) {
						callouts.comments.removeComment(latest);
					}
					return;
				}
			};
			const unsubscribe = callouts.onTabUpdate(removeGhost);
			return unsubscribe;
		}

		function moveGhostOnMouseMove(mymirror: CodeMirror.Editor) {
			const onMouseMove = (e: MouseEvent) => {
				const tab = callouts.tabs.tab;
				if (tab !== CALLOUT_TABS.ANNOTATE) {
					// remove the ghost comment if there is one
					const latest = callouts.comments.latestComment();
					if (latest && latest.ghost === true) {
						callouts.comments.removeComment(latest);
						mymirror.refresh();
					}
					return;
				}

				const pos = mymirror.coordsChar({
					left: e.clientX,
					top: e.clientY + window.scrollY,
				});

				const doc = mymirror.getDoc();
				const line = doc.getLine(pos.line);

				let comment: Comment | null = callouts.comments.latestComment();
				if (!comment || comment.ghost === false) {
					comment = callouts.comments.addComment();
				}
				if (!comment) {
					return;
				}
				if (comment.bookmark) {
					comment.bookmark.clear();
					comment.bookmark = undefined;
				}

				const bookmark = doc.setBookmark(
					CodeMirror.Pos(pos.line, line.length),
					{
						widget: comment.callout,
					}
				);
				comment.bookmark = bookmark;
			};

			const el = mymirror.getWrapperElement();
			el.addEventListener("mousemove", onMouseMove);

			return () => {
				el.removeEventListener("mousemove", onMouseMove);
			};
		}

		const unsubscribeFromGhostOnTabChange = removeLatestGhostOnTabChange();
		const unsubscribeFromGhostMoveMouse = moveGhostOnMouseMove(mymirror);
		const unsubscribeFromMouseLeave = removeGhostOnMouseLeave(mymirror);

		return () => {
			unsubscribeFromGhostMoveMouse();
			unsubscribeFromGhostOnTabChange();
			unsubscribeFromMouseLeave();
		};
	}, [mymirror, callouts]);
}

export function useSetReadOnly(mymirror: CodeMirror.Editor | undefined) {
	const callouts = useCallouts();
	useEffect(() => {
		const toggleReadOnly = (currenttab: CALLOUT_TABS) => {
			if (currenttab === CALLOUT_TABS.PASTE_YOUR_CODE) {
				mymirror?.setOption("readOnly", false);
				mymirror?.setOption("cursorBlinkRate", 530);
			} else {
				mymirror?.setOption("readOnly", true);
				mymirror?.setOption("cursorBlinkRate", -1);
			}
		};
		const unsubscribe = callouts.onTabUpdate(toggleReadOnly);

		return () => unsubscribe();
	}, [mymirror, callouts]);
}

export function useAddComment(mymirror: CodeMirror.Editor | undefined) {
	const callouts = useCallouts();

	useEffect(() => {
		if (!mymirror) {
			return;
		}

		let movedByMouse = false;
		const mousedown = () => {
			movedByMouse = true;
		};
		const keydown = () => {
			movedByMouse = false;
		};
		const beforechange = () => {
			movedByMouse = false;
		};
		const keyup = () => {
			callouts.comments.refreshComments();
		};
		const cursorActivity = (e: CodeMirror.Editor) => {
			if (callouts.tabs.tab !== CALLOUT_TABS.ANNOTATE) {
				return;
			}
			// Click event
			if (movedByMouse) {
				const comments = callouts.comments.allComments();
				const latestComment = comments[comments.length - 1];
				if (!latestComment) {
					return;
				}
				latestComment.ghost = false;

				movedByMouse = false;
			}
		};
		mymirror.on("mousedown", mousedown);
		mymirror.on("keydown", keydown);
		mymirror.on("beforeChange", beforechange);
		mymirror.on("keyup", keyup);
		mymirror.on("cursorActivity", cursorActivity);

		return () => {
			mymirror.off("mousedown", mousedown);
			mymirror.off("keydown", keydown);
			mymirror.off("beforeChange", beforechange);
			mymirror.off("keyup", keyup);
			mymirror.off("cursorActivity", cursorActivity);
		};
	}, [mymirror, callouts]);
}
