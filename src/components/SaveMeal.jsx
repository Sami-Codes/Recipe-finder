/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import "../styles/SaveMeal.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";

export default function SaveMeal({ idMeal }) {
	let user = useAuth();
	let [saved, setSaved] = useState(() => getSavedStateFromDataBase());

	async function getSavedStateFromDataBase() {
		const docRef = doc(db, "users", user.currentUser.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log(docSnap.data()[idMeal], saved, typeof saved);
			setSaved(docSnap.data()[idMeal]);
		} else {
			setSaved(false);
		}
	}

	async function handleClick() {
		setSaved((prev) => !prev);
	}
	useEffect(() => {
		async function syncData() {
			if (typeof saved === "boolean") {
				// Add a new document in collection "users" width the {meal_id: isSaved}
				await setDoc(
					doc(db, "users", user.currentUser.uid),
					{ [idMeal]: saved },
					{ merge: true }
				);
			}
		}
		syncData();
	}, [saved, user.currentUser.uid, idMeal]);

	return (
		<div className="save-icon" onClick={(e) => handleClick(e)}>
			{typeof saved === "boolean" && saved ? (
				<FaBookmark className="icon" />
			) : (
				<FaRegBookmark className="icon" />
			)}
		</div>
	);
}
