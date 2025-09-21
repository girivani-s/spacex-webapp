import { createBrowserRouter } from "react-router";
import { HomePage } from "./Views/HomePage";
import { Launches } from "./Views/Launches";
import { Rockets } from "./Views/Rockets";
import { History } from "./Views/History";
import { RocketDetails } from "./Views/RocketDetails";
import { App } from "./App";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{ index: true, Component: HomePage },
			{ path: "launches", Component: Launches },
			{
				path: "rockets",
				Component: Rockets,
				children: [
					{
						path: ":rocketId",
						Component: RocketDetails,
					},
				],
			},
			{ path: "history", Component: History },
		],
	},
]);
