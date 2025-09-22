import { useSelector } from "react-redux";
import type { IState } from "../../redux/rootReducer";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { filterRockets } from "../../utils/filters";
import type { RocketInfo } from "../../types/rockets";
import { rocketImgStyling } from "../../styles/customStyles";

const Rockets = () => {
	const navigate = useNavigate();
	const rockets = useSelector((state: IState) => state.rockets);
	const [filteredRockets, setFilteredRockets] = useState<RocketInfo>([]);
	const [searchRocket, setSearchRocket] = useState("");
	const debounceSearchRocket = useDebounce(searchRocket, 1500);

	const redirectToRocketDetails = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
		if (!event.target?.id) return;
		navigate(`/rockets/${event.target.id}`);
	};

	useEffect(() => {
		if (!debounceSearchRocket) {
			setFilteredRockets(rockets);
			return;
		}
		setFilteredRockets(filterRockets(rockets, debounceSearchRocket));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceSearchRocket]);

	useEffect(() => {
		setFilteredRockets(rockets);
	}, [rockets]);

	return (
		<div className="text-grey p-4">
			<div className="mb-5">
				<input
					type="search"
					name="search-rocket"
					value={searchRocket}
					onChange={(e) => setSearchRocket(e.target.value)}
					placeholder="Search Rocket"
					className="border-grey border-1 rounded-xl p-1.5"
				/>
			</div>
			<div className="flex flex-col gap-15">
				{filteredRockets.map(({ id, flickr_images, name, description }, index) => (
					<div key={id} className={`md:flex gap-10 ${index % 2 ? "flex-row-reverse" : "flex-row"}`}>
						<div>
							<h2 className="text-xl font-bold mb-7">{name}</h2>
							<img src={flickr_images[0]} className={`block md:hidden mb-5 ${rocketImgStyling}`} />
							<p className="text-justify">{description}</p>
							<p id={id} className="mt-4 cursor-pointer hover:text-text-hover" onClick={redirectToRocketDetails}>
								Read More &gt;&gt;
							</p>
						</div>
						<img src={flickr_images[0]} className={`hidden md:block ${rocketImgStyling}`} />
					</div>
				))}
			</div>
		</div>
	);
};

export { Rockets };
