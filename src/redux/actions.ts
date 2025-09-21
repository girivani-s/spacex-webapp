import type { ICompanyInfo } from "../types/company";
import type { IHistory } from "../types/history";
import type { LaunchesType } from "../types/launches";
import type { RocketInfo } from "../types/rockets";
import * as types from "./actionTypes";

export const setCompanyInfo = (companyInfo: ICompanyInfo) => ({
	type: types.COMPANY_INFO,
	payload: companyInfo,
});

export const setHistory = (history: IHistory[]) => ({
	type: types.HISTORY,
	payload: history,
});

export const setLaunches = (launches: LaunchesType) => ({
	type: types.LAUNCHES_INFO,
	payload: launches,
});

export const setRockets = (rockets: RocketInfo) => ({
	type: types.ROCKETS_INFO,
	payload: rockets,
});
