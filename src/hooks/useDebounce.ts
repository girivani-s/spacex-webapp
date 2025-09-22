import { useEffect, useState } from "react";

export const useDebounce = (value: string, timeInMs: number) => {
	const [searchVal, setSearchVal] = useState("");

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setSearchVal(value);

			return () => clearTimeout(timeoutId);
		}, timeInMs);
	}, [value, timeInMs]);

	return searchVal;
};
