interface NavBarProps {}

export function NavBar(props: NavBarProps) {
	return (
		<nav className="flex flex-row gap-x-4 my-4 md:mt-4 md:mb-32">
			<div className="h-8 pl-4">
				<img
					className="object-cover h-8"
					src={`${process.env.PUBLIC_URL}/Glossy.png`}
					alt="Glossy logo"
				/>
			</div>
		</nav>
	);
}
