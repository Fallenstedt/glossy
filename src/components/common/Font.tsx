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

export function SmallText(props: { children: React.ReactNode }) {
	return (
		<p className="font-inter-light text-md leading-7 text-gray-900 sm:text-md sm:truncate">
			{props.children}
		</p>
	);
}

export function HelpText(props: { children: React.ReactNode }) {
	return (
		<p className="font-inter-light mt-2 text-sm text-gray-500">
			{props.children}
		</p>
	);
}

export function Label({
	children,
	htmlFor,
	...rest
}: {
	children: React.ReactNode;
	htmlFor: string;
} & React.HTMLAttributes<HTMLLabelElement>) {
	return (
		<label
			htmlFor={htmlFor}
			className="font-inter-med block text-sm font-medium text-gray-700"
			{...rest}
		>
			{children}
		</label>
	);
}
