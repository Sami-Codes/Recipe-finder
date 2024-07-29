/* eslint-disable react/prop-types */
import "../styles/littleCard.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function LittleCard(props) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["recipe", props.id],
		queryFn: () => fetchFN(),
	});

	async function fetchFN() {
		let data;
		data = await fetch(
			"https://www.themealdb.com/api/json/v1/1/random.php"
		);
		data = await data.json();
		return data;
	}

	if (isLoading || isError) return;

	let meal = data?.meals[0];

	let tags = [];
	if (meal.strTags?.length) {
		tags = meal.strTags.split(",").map((el, index) => {
			if (el)
				return (
					<span key={index} className="tag">
						{el}
					</span>
				);
		});
	}

	return (
		<Link className="little-card-link" to={`/recipe/${meal.idMeal}`}>
			<div className="little-card">
				<div className="image">
					<img src={meal.strMealThumb} alt="" />
				</div>
				<div className="info">
					<h4 className="heading-6">{meal.strMeal}</h4>
					<div className="tags">
						{tags.length ? (
							<>
								<span className="tags-span">Tags:</span>
								{tags.slice(0, 4)}
							</>
						) : (
							"No Tags Available"
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}
