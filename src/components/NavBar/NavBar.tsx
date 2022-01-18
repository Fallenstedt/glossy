interface NavBarProps {}

export function NavBar(props: NavBarProps) {
	return (
		<nav>
			<div>
				<img src={`${process.env.PUBLIC_URL}/Glossy.png`} />
			</div>
		</nav>
	);
}
