import { Link } from "react-router";
import { navigationLinks } from "../../utils/navigation";

const DesktopNav = () => {
	return (
		<nav className="hidden md:flex items-center gap-15 text-lg links-container">
			{navigationLinks.map(({ path, text }) => (
				<Link to={path} key={path}>
					{text}
				</Link>
			))}
		</nav>
	);
};

export { DesktopNav };
