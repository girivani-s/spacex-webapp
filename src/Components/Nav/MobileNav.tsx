import { Link } from "react-router";
import { navigationLinks } from "../../utils/navigation";
import closeIcon from "../../assets/close.png";
import logo from "../../assets/spacex-logo.svg";

interface IMobileNavProps {
	closeMobileNav: () => void;
}

const MobileNav = ({ closeMobileNav }: IMobileNavProps) => {
	return (
		<div className="fixed z-10 h-dvh w-dvw bg-bg-primary p-2">
			<div className="flex ">
				<Link to="/" className="flex-1">
					<img src={logo} />
				</Link>
				<img src={closeIcon} className="h-4 invert self-end" onClick={closeMobileNav} />
			</div>
			<nav className="flex flex-col items-center gap-10 text-lg mt-20 links-container">
				{navigationLinks.map(({ path, text }) => (
					<Link to={path} key={path} className="w-full text-center" onClick={closeMobileNav}>
						{text}
					</Link>
				))}
			</nav>
		</div>
	);
};

export { MobileNav };
