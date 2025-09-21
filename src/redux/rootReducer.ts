import * as types from "./actionTypes";
import type { ICompanyInfo } from "../types/company";
import type { IHistory } from "../types/history";
import type { LaunchesType } from "../types/launches";
import type { RocketInfo } from "../types/rockets";

export interface IState {
	companyInfo: ICompanyInfo;
	history: IHistory;
	launches: LaunchesType;
	rockets: RocketInfo;
}

export const rootReducer = (state: IState = {} as IState, action: Record<string, any>) => {
	switch (action.type) {
		case types.COMPANY_INFO:
			return { ...state, companyInfo: action.payload };
		case types.HISTORY:
			return { ...state, history: action.payload };
		case types.LAUNCHES_INFO:
			return { ...state, launches: action.payload };
		case types.ROCKETS_INFO:
			return { ...state, rockets: action.payload };
		default:
			return state;
	}
};
