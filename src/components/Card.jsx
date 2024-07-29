/* eslint-disable react/prop-types */
import "../styles/card.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SaveMeal from "../components/SaveMeal";
import { useAuth } from "../contexts/authContext";

export default function Card({ idMeal }) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["recipe", idMeal],
		queryFn: () => fetchFN(),
	});

	let user = useAuth();

	async function fetchFN() {
		let data;
		data = await fetch(
			`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
		);
		data = await data.json();
		return data;
	}

	if (isLoading || isError) return "";

	let meal = data?.meals[0];

	return (
		<div className="card">
			<div className="top">
				<Link to={`/recipe/${meal?.idMeal}`} className="card-link">
					<div className="image">
						<img src={meal?.strMealThumb} alt="" />
					</div>
				</Link>
				{user.userLoggedIn && <SaveMeal idMeal={idMeal} />}
			</div>
			<div className="info">
				<Link to={`/recipe/${meal?.idMeal}`} className="card-link">
					<h3 className="heading-5 name"> {meal?.strMeal}</h3>
				</Link>
				<p className="category">
					category:{" "}
					<span className="special"> {meal?.strCategory}</span>
				</p>
				<p className="area">
					This dish is:{" "}
					<span className="special">{meal?.strArea}</span>
				</p>
				<p className="ingredients">
					{`${meal?.strIngredient1}, ${meal?.strIngredient2}, ${meal?.strIngredient3}...  `}{" "}
					<Link
						to={`/recipe/${meal?.idMeal}`}
						className="card-link see-more"
					>
						<span className="special">see more</span>
					</Link>
				</p>
			</div>
		</div>
	);
}
