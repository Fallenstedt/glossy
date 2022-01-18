import { CALLOUT_MODE } from "../../util/constants";
import { Comment } from "./comment";

export type CommentCallback = (comments: Comment[]) => void;
export type TabCallback = (tab: CALLOUT_MODE) => void;
export type ThemeUpdateCallback = (isLight: boolean) => void;
