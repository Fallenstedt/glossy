import React, { useContext, useState } from "react";
import { DEFAULT_COLOR } from "../util/constants";

export const ColorContext = React.createContext({
	color: DEFAULT_COLOR,
	setColor: (c: string) => {},
});

export const ColorProvider = ColorContext.Provider;
export const useInitializeColor = () => {
	const [color, setColor] = useState(DEFAULT_COLOR);

	return { color, setColor: (c: string) => setColor(c) };
};
export function useColor() {
	const context = useContext(ColorContext);
	return context;
}
