import type { IRocketInfo } from "../types/rockets";

export const contructRocketTableDetails = (rocket: IRocketInfo) => {
	return [
		{
			id: "height",
			name: "Height",
			value: rocket.height.meters + " meters",
		},
		{
			id: "diameter",
			name: "Diameter",
			value: rocket.diameter.meters + " meters",
		},

		{
			id: "weight",
			name: "Weight",
			value: rocket.mass.kg + " Kg",
		},

		{
			id: "stages",
			name: "Stages",
			value: rocket.stages,
		},
		{
			id: "country",
			name: "Country",
			value: rocket.country,
		},
		{
			id: "active",
			name: "Active",
			value: rocket.active == false ? "Yes" : "No",
		},
		{
			id: "boosters",
			name: "Boosters",
			value: rocket.boosters,
		},
		{
			id: "successRatePct",
			name: "Success Rate %",
			value: rocket.success_rate_pct + "%",
		},
		{
			id: "costPerLaunch",
			name: "Cost Per Launch",
			value: "$" + rocket.cost_per_launch,
		},
	];
};

export const keyboardKeyToImgDirectionMap: Record<string, "next" | "prev"> = {
	ArrowRight: "next",
	ArrowLeft: "prev",
};
