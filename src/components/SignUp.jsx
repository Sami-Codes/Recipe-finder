/* eslint-disable react/prop-types */
import { useState } from "react";
import blob from "../assets/blob (1).svg";
import "../styles/signup.css";
import dish from "../assets/kitchn_deckitchn_dec4533-1.webp";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import {
	doSignInWithEmailAndPassword,
	doSignInWithGoogle,
	doCreateUserWithEmailAndPassword,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function SignUp({ path }) {
	window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

	//state for handling form data
	let [formData, setFormData] = useState({
		username: "",
		password: "",
		["password-confirm"]: "",
		email: "",
	});
	//state for handling error messsage
	let [errorMessageState, setErrorMessageState] = useState({
		username: "",
		password: "",
		["password-confirm"]: "",
		email: "",
	});

	// handle user signing in with async functionality
	let [isSigningIn, setIsSingingIn] = useState(false);

	// user data from auth context
	let user = useAuth();

	//updating formData state on form inputs change
	function handleChange(e) {
		setFormData((prev) => {
			let result = { ...prev, [e.target.name]: e.target.value };
			return result;
		});
	}

	//handling form submit
	//(probably needs refactoring)
	async function handleSubmit(e) {
		let errorMessage = {
			username: "",
			password: "",
			["password-confirm"]: "",
			email: "",
		};

		// handling require error messages
		e.preventDefault();
		for (const key in formData) {
			if (!formData[key]) {
				errorMessage = {
					...errorMessage,
					[key]: `${key} is required`,
				};
			}
		}

		if (formData.username.length > 20 || formData.username.length < 6)
			errorMessage = {
				...errorMessage,
				username: "username must be between 6-20 characters",
			};
		if (formData.password.length > 20 || formData.password.length < 6)
			errorMessage = {
				...errorMessage,
				password: "password must be between 6-20 characters",
			};
		if (formData.password !== formData["password-confirm"])
			errorMessage = {
				...errorMessage,
				["password-confirm"]: "password confirmation isn't valid",
			};

		let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		if (!regex.test(formData.email)) {
			errorMessage = {
				...errorMessage,
				["email"]: "enter a valid email",
			};
		}
		setErrorMessageState({ ...errorMessage });

		if (path == "sign-up") {
			if (
				errorMessage.username ||
				errorMessage.password ||
				errorMessage["password-confirm"] ||
				errorMessage.email
			) {
				return;
			} else {
				if (!isSigningIn) {
					setIsSingingIn(true);
					console.log("one");
					await doCreateUserWithEmailAndPassword(
						formData.email,
						formData.password
					).then((result) => {
						result.user.updateProfile({
							displayName: formData.username,
						});
					});
					console.log("two");
				}
			}
		}
		if (path == "login") {
			if (errorMessage.password || errorMessage.email) return;
			if (!isSigningIn) {
				setIsSingingIn(true);
				await doSignInWithEmailAndPassword(
					formData.email,
					formData.password
				);
			}
		}
	}
	async function handleGoogleSignUp() {
		if (!isSigningIn) {
			setIsSingingIn(true);
			await doSignInWithGoogle().catch(() => {
				setIsSingingIn(false);
			});
		}
	}

	return (
		<>
			{user.userLoggedIn && <Navigate to="/search" />}
			<main className="sign-up">
				<div className="blob">
					{" "}
					<img src={blob} alt="blob" />{" "}
				</div>
				<div className="content">
					<div className="form">
						<div className="image">
							<img src={dish} alt="" />
						</div>
						<form onSubmit={(e) => handleSubmit(e)}>
							<h3 className="heading-3">
								want to discover new
								<span className="special"> recipes</span>
							</h3>

							<div
								className={`input ${
									errorMessageState.username && "error"
								}`}
							>
								{path == "sign-up" && (
									<>
										<label htmlFor="username">
											<FaUser className="icon" /> Enter
											Your Username
										</label>
										<input
											type="text"
											name="username"
											id="username"
											placeholder="Username"
											onChange={(e) => handleChange(e)}
										/>
										<p className="error">
											{errorMessageState.username}
										</p>
									</>
								)}
							</div>

							<div
								className={`input ${
									errorMessageState.email && "error"
								}`}
							>
								<label htmlFor="email">
									<MdEmail className="icon" /> Enter Your
									E-mail
								</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="E-mail"
									onChange={(e) => handleChange(e)}
								/>
								<p className="error">
									{errorMessageState.email}
								</p>
							</div>

							<div
								className={`input ${
									errorMessageState.password && "error"
								}`}
							>
								<label htmlFor="password">
									<RiLockPasswordLine className="icon" />
									Enter a secure password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									onChange={(e) => handleChange(e)}
								/>
								<p className="error">
									{errorMessageState.password}
								</p>
							</div>

							<div
								className={`input ${
									errorMessageState["password-confirm"] &&
									"error"
								}`}
							>
								{path == "sign-up" && (
									<>
										<label htmlFor="password-confirm">
											<RiLockPasswordLine className="icon" />
											confirm your password
										</label>
										<input
											type="password"
											name="password-confirm"
											id="password-confirm"
											placeholder="Password Confirmation"
											onChange={(e) => handleChange(e)}
										/>
										<p className="error">
											{
												errorMessageState[
													"password-confirm"
												]
											}
										</p>
									</>
								)}
							</div>

							<div className="input">
								<button
									className="sign-up button-shape primary"
									type="submit"
									disabled={isSigningIn}
								>
									Sign Up
								</button>
								<button
									type="button"
									className="sign-up-google button-shape primary"
									onClick={() => handleGoogleSignUp()}
									disabled={isSigningIn}
								>
									Sign in with Google
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
