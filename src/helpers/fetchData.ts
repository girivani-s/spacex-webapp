import axios from "axios";

export const fetchCompanyInfo = async () => {
	axios.get("https://api.spacexdata.com/v4/company");
};
