import { useSelector } from "react-redux";
import type { IState } from "../../redux/rootReducer";
import { Link } from "react-router";
import { useMemo, useState, type ReactNode } from "react";
import youtubeLogo from "../../assets/youtube.png";
import wikipediaLogo from "../../assets/wikipedia.png";
import nextArrow from "../../assets/nextArrow.png";
import prevArrow from "../../assets/prevArrow.png";
import "./Launches.css";
import dayjs from "dayjs";

const Launches = () => {
	const { launches, rockets } = useSelector((state: IState) => ({
		launches: state.launches.sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()),
		rockets: state.rockets,
	}));
	const [page, setPage] = useState(0);
	const filteredLaunches = useMemo(() => {
		return launches.slice(page * 10, page * 10 + 10);
	}, [launches, page]);
	const totalPages = useMemo(() => Math.ceil(launches.length / 10), [launches]);

	const launchesTableInfo = useMemo(() => {
		return filteredLaunches.reduce((acc, launch) => {
			acc[launch.id] = [
				launch.name,
				launch.flight_number,
				rockets.find((rocket) => launch.rocket === rocket.id)?.name,
				!launch.static_fire_date_utc ? "--" : dayjs(launch.static_fire_date_utc).format("DD/MM/YYYY"),
				dayjs(launch.date_utc).format("DD/MM/YYYY"),
				!launch.success ? "No" : "Yes",
				launch.failures?.length || "--",
				!launch.links.wikipedia ? (
					"--"
				) : (
					<Link to={launch.links.wikipedia} target="_blank" className="links-container">
						<img src={wikipediaLogo} className="h-8 invert" />
					</Link>
				),
				!launch.links.webcast ? (
					"--"
				) : (
					<Link to={`https://www.youtube.com/embed/${launch.links.webcast}`} target="_blank" className="links-container">
						<img src={youtubeLogo} className="h-8" />
					</Link>
				),
			];
			return acc;
		}, {} as Record<string, Array<string | number | Date | ReactNode>>);
	}, [filteredLaunches, rockets]);

	const changeImg = (direction: "next" | "prev") => {
		if (!direction || (direction === "next" && page === totalPages - 1) || (direction === "prev" && !page)) return;
		setPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
	};

	return (
		<div className="text-grey p-4 flex flex-col justify-center items-center w-full">
			<div className="w-[90vw] overflow-x-auto">
				<table className="launches-details-table text-center my-5 w-full">
					<thead>
						<th>Name</th>
						<th>Flight Number</th>
						<th>Rocket</th>
						<th>Fire Date</th>
						<th>Date</th>
						<th>Success</th>
						<th>Failures</th>
						<th>Wiki</th>
						<th>Webcast</th>
					</thead>
					<tbody>
						{Object.entries(launchesTableInfo)?.map(([id, launch]) => (
							<tr key={id}>
								{launch.map((value, index) => (
									<td key={index}>{value}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex items-center gap-10 justify-between md:justify-center">
				<img className={`left-0 md:static h-8 md:h-10 ${!page ? "opacity-50" : "cursor-pointer"}`} src={prevArrow} onClick={() => changeImg("prev")} />
				<p>
					Page {page + 1} of {totalPages}
				</p>
				<img
					className={`right-0 md:static h-8 md:h-10 ${page === totalPages - 1 ? "opacity-50" : "cursor-pointer"}`}
					src={nextArrow}
					onClick={() => changeImg("next")}
				/>
			</div>
		</div>
	);
};

export { Launches };
