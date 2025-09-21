import { useSelector } from "react-redux";
import type { IState } from "../../redux/rootReducer";
import { Link } from "react-router";

const Launches = () => {
	const { launches, rockets } = useSelector((state: IState) => ({
		launches: state.launches,
		rockets: state.rockets,
	}));

	return (
		<>
			{launches.slice(0, 15).map((launch) => {
				const rocket = rockets.find((rocket) => launch.rocket === rocket.id) ?? {};

				return (
					<div>
						<p>{launch.name}</p>
						<img src={launch.links.patch.small} alt="Launch Img" width={100} height={100} />
						<iframe src={launch.links.webcast.replace("watch?v=", "/embed/")} width={300}></iframe>
						<Link to={launch.links.article}>Read More</Link>
						<p>Fire Time: {launch.static_fire_date_utc}</p>
						<p>
							{rocket?.type || ""}: {rocket?.name || ""}
						</p>
						<p>Success : {launch.success ? "Yes" : "No"}</p>
					</div>
				);
			})}
		</>
	);
};

export { Launches };
