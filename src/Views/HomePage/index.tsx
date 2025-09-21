import { useSelector } from "react-redux";
import type { IState } from "../../redux/rootReducer";
import "./Homepage.css";
import { useMemo } from "react";
import ceo from "../../assets/elon-musk.jpeg";
import coo from "../../assets/coo.jpeg";
import cto_propulsion from "../../assets/cto_propulsion.jpeg";

const HomePage = () => {
	const companyInfo = useSelector((state: IState) => state.companyInfo);
	const { companyStatistics, directors } = useMemo(() => {
		return {
			companyStatistics: [
				{
					value: companyInfo.employees,
					text: "Employees",
				},
				{
					value: companyInfo.vehicles,
					text: "Vehicles",
				},
				{
					value: companyInfo.launch_sites,
					text: "Launch Sites",
				},
				{
					value: companyInfo.test_sites,
					text: "Test Sites",
				},
			],
			directors: [
				{
					position: "CEO",
					image: ceo,
					name: companyInfo.ceo,
				},
				{
					position: "COO",
					image: coo,
					name: companyInfo.coo,
				},
				{
					position: "CTO Propulsion",
					image: cto_propulsion,
					name: companyInfo.cto_propulsion,
				},
			],
		};
	}, [companyInfo]);

	return (
		<div>
			<div className="summay-container flex items-end justify-end text-sm md:text-xl text font-semibold p-2 text-white">
				<p className="mr-auto md:w-3/5 text-justify">{companyInfo.summary}</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 place-items-center company-statistics-container bg-black">
				{companyStatistics.map(({ value, text }) => (
					<div className="w-full flex flex-col flex-1 items-center justify-center company-statistics-section">
						<p>{value}</p>
						<p>{text}</p>
					</div>
				))}
			</div>
			{/* Company directors */}
			<div className="flex justify-evenly h-fit">
				{directors.map(({ name, image, position }) => (
					<div className="h-fit relative">
						<img src={image} className="w-30 h-30 md:w-50 md:h-50 contain" />
						<div className="absolute bottom-0 text-center w-full bg-black/80">
							<p className="text-grey">{name.split(" ")[0]}</p>
							<p className="text-grey text-sm">{position}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export { HomePage };
