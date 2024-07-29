import { useDeferredValue, useEffect, useRef, useState } from "react";
import Card from "./Card.jsx";
import "../styles/searchpage.css";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { MdError } from "react-icons/md";
import { useSearchValue } from "../contexts/searchValue.context.jsx";

export default function SearchPage() {
	async function fetchFN(link) {
		let data = await fetch(link);
		data = await data.json();
		return data;
	}

	//fetching data on search
	let searchValueContext = useSearchValue();
	let searchValue = useDeferredValue(searchValueContext.searchValue);

	let {
		data: searchedData,
		isLoading: isLoading_search,
		isError: isError_search,
		error: searchError,
		refetch: refetchSearch,
	} = useQuery({
		queryKey: [searchValue],
		enabled: false,
		queryFn: () =>
			fetchFN(
				`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
			),
	});
	useEffect(() => {
		if (searchValue) refetchSearch();
	}, [searchValue, refetchSearch]);

	// managing auto scrolling
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, []);
	// scroll to results section on button click
	const scrollToRef = (ref) =>
		window.scrollTo({
			top: ref.current.offsetTop,
			left: 0,
			behavior: "smooth",
		});
	const myRef = useRef(null);

	// managing requested category state (onclick category)
	let [requestedCategory, setRequestedCategory] = useState({});
	let [area, setArea] = useState("");

	// handle button click (display desired category meals)
	function handleClick(event) {
		let value = event.currentTarget.getAttribute("data-value");
		let valueType = event.currentTarget.getAttribute("data-value-type");
		setRequestedCategory({
			value: value,
			valueType: valueType,
		});
		setArea(value);
		console.log(searchValue);
	}

	// fetching requested category data
	let {
		data: requestedCategoryData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: [area],
		enabled: false,
		queryFn: () =>
			fetchFN(
				requestedCategory.valueType === "category"
					? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${requestedCategory.value}`
					: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${requestedCategory.value}`
			),
	});
	useEffect(() => {
		refetch().then(() => {
			if (myRef.current) scrollToRef(myRef);
		});
	}, [refetch, requestedCategory]);

	// fetching the available categories
	let {
		data: categories,
		isLoading: isLoading_categories,
		isError: isError_categories,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: () =>
			fetchFN(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`),
	});

	// fetching the available areas
	let {
		data: areas,
		isLoading: isLoading_areas,
		isError: isError_areas,
	} = useQuery({
		queryKey: ["areas"],
		queryFn: () =>
			fetchFN(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`),
	});

	let areasSection;
	let categoriesSection;
	let resultsSection;

	if (isLoading_categories || isLoading_areas || isLoading_search)
		return (
			<main className="search-page loading">
				<div className="loader"></div>
			</main>
		);

	if (isLoading) {
		resultsSection = (
			<div className="section" ref={myRef}>
				<h3 className="section-title heading-3">{area}</h3>
				<div className="error-section loading">
					<div className="loader"></div>
				</div>
			</div>
		);
	}

	if (isError || isError_search) {
		resultsSection = (
			<div className="section" ref={myRef}>
				<h3 className="section-title heading-3">
					{area || `Search: ${searchValue}`}
				</h3>
				<div className="error-section loading">
					<h1 className="heading-1">
						{error?.message || searchError.message}{" "}
						<MdError className="icon" />
					</h1>
				</div>
			</div>
		);
	}

	if (isError_areas && isError_categories)
		return (
			<main className="search-page error">
				<h1 className="heading-1">
					Error: could not load data <MdError className="icon" />
				</h1>
			</main>
		);
	if (isError_categories) categoriesSection = "";
	if (isError_areas) areasSection = "";

	// displaying the available categories as buttons (onclick the meals of said category will be displayed)
	if (categories?.meals) {
		let categoriesEl = categories.meals.map((category) => {
			return (
				<button
					key={nanoid()}
					data-value={category.strCategory}
					data-value-type={"category"}
					className="category-link"
					onClick={(event) => handleClick(event)}
				>
					<span className="text">{category.strCategory}</span>
				</button>
			);
		});
		categoriesSection = (
			<div className="section">
				<h3 className="section-title heading-3">Categories</h3>
				<div className="links">{categoriesEl} </div>
			</div>
		);
	}

	// displaying the available areas as buttons (onclick the meals of said category will be displayed)
	if (areas?.meals) {
		let areasEl = areas.meals.map((area) => {
			return (
				<button
					key={nanoid()}
					data-value={area.strArea}
					data-value-type={"area"}
					className="category-link"
					onClick={(event) => handleClick(event)}
				>
					<span className="text">{area.strArea}</span>
				</button>
			);
		});
		areasSection = (
			<div className="section">
				<h3 className="section-title heading-3">Areas</h3>
				<div className="links">{areasEl} </div>
			</div>
		);
	}

	//creating the card elements dynamically depending on the clicked category
	let cardsElements = [];
	if (requestedCategoryData?.meals) {
		cardsElements = requestedCategoryData.meals.map((meal) => {
			return <Card key={nanoid()} idMeal={meal.idMeal} />;
		});
		resultsSection = (
			<div className="section" ref={myRef}>
				<h3 className="section-title heading-3">{area}</h3>
				<div className="cards">{cardsElements} </div>
			</div>
		);
	}

	// handling search results
	if (searchValue) {
		areasSection = "";
		categoriesSection = "";
	}

	if (searchedData?.meals) {
		cardsElements = searchedData.meals.map((meal) => {
			return <Card key={nanoid()} idMeal={meal.idMeal} />;
		});
		resultsSection = (
			<div className="section" ref={myRef}>
				<h3 className="section-title heading-3">
					Search: {searchValue}
				</h3>
				<div className="cards">{cardsElements} </div>
			</div>
		);
	}
	if (searchValue && searchedData?.meals === null && !isLoading_search) {
		categoriesSection = "";
		areasSection = "";
		resultsSection = (
			<div className="section" ref={myRef}>
				<h3 className="section-title heading-3">
					Search: {searchValue}
				</h3>
				<div className="error-section loading">
					<h1 className="heading-1">
						{"couldn't find this recipe"}{" "}
						<MdError className="icon" />
					</h1>
				</div>
			</div>
		);
	}

	return (
		<main className="search-page">
			<h1 className="heading-1">
				explore new <span className="special">TASTES.</span>
			</h1>
			<div className="content">
				{categoriesSection}
				{areasSection}
				{resultsSection}
			</div>
		</main>
	);
}
