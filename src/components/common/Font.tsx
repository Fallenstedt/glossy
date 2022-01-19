import React from "react";

export function H1(props: {
	children: React.ReactNode;
	contenteditable?: boolean;
}) {
	return (
		<h1
			suppressContentEditableWarning={true}
			contentEditable={props.contenteditable ?? false}
			className="font-inter-med text-4xl font-bold leading-7 text-gray-900 dark:text-baby-powder sm:text-3xl"
		>
			{props.children}
		</h1>
	);
}

export function H2(props: { children: React.ReactNode }) {
	<h2 className="font-inter-med block text-sm font-medium text-gray-700">
		{props.children}
	</h2>;
}

export function LargeText(props: { children: React.ReactNode }) {
	return (
		<p className="font-inter-light text-xl leading-7 text-gray-900 dark:text-baby-powder sm:text-2xl">
			{props.children}
		</p>
	);
}

export function SmallText(props: { children: React.ReactNode }) {
	return (
		<p className="font-inter-light text-sm leading-7 text-gray-900 dark:text-baby-powder sm:text-md">
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
