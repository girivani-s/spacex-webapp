import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { apiToUrlMap } from "./ApiMapping";
import type { ICompanyInfo } from "./types/company";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyInfo, setHistory, setLaunches, setRockets } from "./redux/actions";
import type { IState } from "./redux/rootReducer";
import type { IHistory } from "./types/history";
import type { LaunchesType } from "./types/launches";
import type { RocketInfo } from "./types/rockets";
import logo from "./assets/spacex-logo.svg";
import twitterLogo from "./assets/twitter.png";
import flickrLogo from "./assets/flickr.png";
import spacexLogoSmall from "./assets/spacex-logo-small.png";
import menuIcon from "./assets/menu-bar.png";
import { DesktopNav } from "./Components/Nav/DesktopNav";
import { MobileNav } from "./Components/Nav/MobileNav";

const App = () => {
	const dispatch = useDispatch();
	const companyInfo = useSelector((state: IState) => state.companyInfo);
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const fetchData = async () => {
		try {
			// Todo: Add a hook/fn for axios calls
			const [companyInfo, history, launches, rockets] = await Promise.all([
				axios.get<ICompanyInfo>(apiToUrlMap.getCompanyInfo),
				axios.get<IHistory[]>(apiToUrlMap.getHistory),
				axios.get<LaunchesType>(apiToUrlMap.getLaunches),
				axios.get<RocketInfo>(apiToUrlMap.getRockets),
			]);

			dispatch(setCompanyInfo(companyInfo.data));
			dispatch(setHistory(history.data));
			dispatch(setLaunches(launches.data));
			dispatch(setRockets(rockets.data));
		} catch (err) {
			console.error(err);
		}
	};

	const closeMobileNav = () => setIsMobileNavOpen(false);

	useEffect(() => {
		fetchData();
	}, []);

	if (!companyInfo) return "Loading";

	return (
		<>
			{/* Mobile Nav */}
			{isMobileNavOpen && <MobileNav closeMobileNav={closeMobileNav} />}

			<div className="flex items-baseline p-2 bg-black nav-container">
				<Link to="/" className="flex-1">
					<img src={logo} />
				</Link>
				<DesktopNav />

				<div className="flex-1"></div>
				<div className="md:hidden flex items-center">
					<img src={menuIcon} className="h-5 invert" onClick={() => setIsMobileNavOpen(true)} />
				</div>
			</div>
			<div className="top-space"></div>
			<Outlet />
			<div className="flex flex-col items-center gap-5 p-2 bg-black footer-container">
				<div className="flex gap-10">
					<Link to={companyInfo.links.twitter} target="_blank">
						<img src={twitterLogo} />
					</Link>
					<Link to={companyInfo.links.flickr} target="_blank">
						<img src={flickrLogo} />
					</Link>
					<Link to={logo} target="_blank">
						<img src={spacexLogoSmall} />
					</Link>
				</div>
				<address>
					{companyInfo.headquarters.address} {companyInfo.headquarters.state} {companyInfo.headquarters.city}
				</address>
			</div>
		</>
	);
};

export { App };
