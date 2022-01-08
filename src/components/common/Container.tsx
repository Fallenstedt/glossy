import React from "react";

export function Container(props: { children: React.ReactNode }) {
	return (
		<div className="container mx-auto max-w-3xl mb-10">{props.children}</div>
	);
}
