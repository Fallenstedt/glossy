import { CALLOUT_TABS } from "../../util/constants";
import { Comment } from "./comment";

export type CommentCallback = (comments: Comment[]) => void;
export type TabCallback = (tab: CALLOUT_TABS) => void;
export type ThemeUpdateCallback = (isLight: boolean) => void;
