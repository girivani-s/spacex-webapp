import { useSelector } from "react-redux";
import type { IState } from "../../redux/rootReducer";
import { useParams } from "react-router";
import { useMemo, useState } from "react";
import nextArrow from "../../assets/nextArrow.png";
import prevArrow from "../../assets/prevArrow.png";
import "./RocketDetails.css";
import { contructRocketTableDetails, keyboardKeyToImgDirectionMap } from "../../utils/config";

const RocketDetails = () => {
	const params = useParams();
	const rocket = useSelector((state: IState) => state.rockets.find((rocket) => rocket.id === params.rocketId));
	const [viewingImgIndex, setViewingImgIndex] = useState(0);
	const rocketTableInfo = useMemo(() => {
		if (!rocket) return [];
		return contructRocketTableDetails(rocket);
	}, [rocket]);

	const changeImg = (direction: "next" | "prev") => {
		if (
			!direction ||
			!rocket ||
			(direction === "next" && viewingImgIndex === rocket.flickr_images.length - 1) ||
			(direction === "prev" && !viewingImgIndex)
		)
			return;
		setViewingImgIndex((prev) => (direction === "next" ? prev + 1 : prev - 1));
	};

	if (!rocket) return <p className="text-grey h-dvh flex items-center justify-center">Rocket Not Found</p>;
	return (
		<>
			<div className="p-4 text-grey rocket-details-page" tabIndex={0} onKeyDown={(e) => changeImg(keyboardKeyToImgDirectionMap[e.key])}>
				{/* Image Carousel */}
				<div className="flex items-center justify-between relative">
					<img
						className={`left-0 absolute md:static h-8 md:h-10 ${!viewingImgIndex ? "opacity-50" : "cursor-pointer"}`}
						src={prevArrow}
						onClick={() => changeImg("prev")}
					/>
					{rocket.flickr_images.map((link, index) => (
						<img key={index} src={link} className={`h-[50vh] w-full md:w-auto md:h-[70vh] ${index === viewingImgIndex ? "block" : "hidden"}`} />
					))}
					<img
						className={`right-0 absolute md:static h-8 md:h-10 ${viewingImgIndex === rocket.flickr_images.length - 1 ? "opacity-50" : "cursor-pointer"}`}
						src={nextArrow}
						onClick={() => changeImg("next")}
					/>
				</div>
				{/* Details */}
				<h2 className="font-bold text-2xl text-center mt-10 mb-5">{rocket.name}</h2>

				<div>
					<p>{rocket.description}</p>

					<table className="rocket-details-table text-center mx-auto my-5 w-full md:w-[50vw]">
						<tbody>
							{rocketTableInfo?.map(({ id, name, value }) => (
								<tr key={id}>
									<td>{name}</td>
									<td>{value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export { RocketDetails };
