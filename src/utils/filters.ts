import type { RocketInfo } from "../types/rockets";

export const filterRockets = (rockets: RocketInfo, searchVal: string) => {
	return (
		rockets.filter(
			(rocket) => rocket.name.toLowerCase().includes(searchVal.toLowerCase()) || rocket.description.toLowerCase().includes(searchVal.toLowerCase())
		) ?? []
	);
};
