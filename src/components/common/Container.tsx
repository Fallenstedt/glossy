import React from "react";

export function Container(props: { children: React.ReactNode }) {
	return <div className="container mx-auto max-w-4xl">{props.children}</div>;
}
