import React from "react";

export function H1(props: { children: React.ReactNode }) {
	return (
		<h1 className="font-inter-med text-4xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
			{props.children}
		</h1>
	);
}

export function LargeText(props: { children: React.ReactNode }) {
	return (
		<p className="font-inter-light text-xl leading-7 text-gray-900 sm:text-2xl sm:truncate">
			{props.children}
		</p>
	);
}
