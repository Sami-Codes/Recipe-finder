import "../styles/recipePage.css";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import LittleCard from "./LittleCard.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdError } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import { nanoid } from "nanoid";
import SaveMeal from "../components/SaveMeal";
import { useAuth } from "../contexts/authContext";

export default function SearchPage() {
	window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

	const user = useAuth();
	const { id } = useParams();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["recipe", id],
		queryFn: () => fetchFN(),
	});

	async function fetchFN() {
		let data;
		if (id == "random") {
			data = await fetch(
				"https://www.themealdb.com/api/json/v1/1/random.php"
			);
		} else {
			data = await fetch(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			);
		}
		console.log(data);
		data = await data.json();
		return data;
	}

	if (isLoading) {
		return (
			<main className="recipe-page loading">
				<div className="loader"></div>
			</main>
		);
	}
	if (isError)
		return (
			<main className="recipe-page error">
				<h1 className="heading-1">{error.message}</h1>
			</main>
		);
	console.log(data, id, data.meals);
	if (!data.meals)
		return (
			<main className="recipe-page error">
				<h1 className="heading-1">
					This meal is not available <MdError className="icon" />
				</h1>
			</main>
		);

	let meal = data?.meals[0];

	let ingredients = [];
	for (let i = 1; i <= 20; i++) {
		if (!meal[`strIngredient${i}`]) break;
		ingredients.push([meal[`strIngredient${i}`], meal[`strMeasure${i}`]]);
	}

	let ingredientsElements = ingredients.map((el, index) => {
		return (
			<div className="ingredient-element" key={index}>
				<span className="ingredient">{el[0]}</span>
				<span className="measure">{el[1]}</span>
			</div>
		);
	});

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

	let instructions = meal?.strInstructions.split("\n").map((el, index) => {
		if (el)
			return (
				<div className="instruction" key={index}>
					{el}
				</div>
			);
		return "";
	});

	const numOfSuggestions = 2;
	let suggestionEl = [];
	for (let i = 0; i < numOfSuggestions; i++) {
		suggestionEl.push(<LittleCard key={nanoid()} id={i} />);
	}

	return (
		<main className="recipe-page">
			<div className="path">
				{`Home > Recipe > `} <span>{meal.strMeal}</span>
			</div>
			<div className="title">
				<h1 className="heading-2">{meal.strMeal}</h1>
				{user.userLoggedIn && <SaveMeal idMeal={meal.idMeal} />}
			</div>
			<div className="content">
				<section>
					<div className="image">
						<img src={meal.strMealThumb} alt="" />
					</div>
					<div className="icons">
						<div className="area">
							<FaMapLocationDot className="icon" />
							<span className="data">{meal.strArea}</span>
						</div>
						<div className="category">
							<GiHotMeal className="icon" />
							<span className="data">{meal.strCategory}</span>
						</div>
						<div className="youtube">
							<FaYoutube className="icon" />
							<span className="data">
								<a target="_blank" href={meal.strYoutube}>
									Youtube <br /> Instruction <IoOpenOutline />
								</a>
							</span>
						</div>
					</div>
					<div className="tags">
						{Boolean(tags.length) && (
							<>
								<span className="tags-span">Tags:</span>
								{tags}
							</>
						)}
					</div>
					<div className="instructions">
						<h3 className="heading-5">Instructions:</h3>
						{instructions}
					</div>
				</section>
				<aside>
					<div className="ingredients">
						<h3 className="heading-5">Ingredients:</h3>
						{ingredientsElements}
					</div>
					<h3 className="heading-5">recipes like this:</h3>
					<div className="recommendations">{suggestionEl}</div>
				</aside>
			</div>
		</main>
	);
}
