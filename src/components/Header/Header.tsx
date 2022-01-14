interface HeaderProps {
	children: React.ReactNode;
}

export function Header(props: HeaderProps) {
	return <header className="text-center">{props.children}</header>;
}
