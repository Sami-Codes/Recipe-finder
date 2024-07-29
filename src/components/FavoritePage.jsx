import { nanoid } from "nanoid";
import Card from "./Card";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";

export default function FavoritePage() {
	let user = useAuth();

	let [favorites, setFavorites] = useState("");

	useEffect(() => {
		async function getFavoritesFromDataBase() {
			const docRef = doc(db, "users", user.currentUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log(docSnap.data());
				setFavorites(docSnap.data());
			} else {
				setFavorites(false);
			}
		}
		getFavoritesFromDataBase();
	}, [user.currentUser.uid]);

	let cardsElements = [];
	let resultsSection;
	if (typeof favorites === "object" && favorites) {
		for (const meal in favorites) {
			if (
				Object.hasOwnProperty.call(favorites, meal) &&
				favorites[meal] === true
			) {
				cardsElements.push(<Card key={nanoid()} idMeal={meal} />);
			}
		}
		if (cardsElements.length) {
			resultsSection = (
				<div className="section">
					<div className="cards">{cardsElements} </div>
				</div>
			);
		} else {
			resultsSection = (
				<div className="error-section no-favorites">
					<h1 className="heading-1">You Have No Saved Meals</h1>
				</div>
			);
		}
	}

	return (
		<main className="search-page">
			<h1 className="heading-1">
				Revisit Your <span className="special">FAVORITES.</span>
			</h1>
			<div className="content">{resultsSection}</div>
		</main>
	);
}
