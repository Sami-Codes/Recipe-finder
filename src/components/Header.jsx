/* eslint-disable react/prop-types */
import logo from "../assets/fork.png";
import { FaSearch } from "react-icons/fa";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { useSearchValue } from "../contexts/searchValue.context";
import { FaHeart } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

export default function Header(props) {
	let user = useAuth();
	let searchValue = useSearchValue();

	let navigate = useNavigate();

	async function handleClick() {
		await doSignOut().then(() => {
			console.log("signed out", user.userLoggedIn);
			navigate("/");
		});
	}

	return (
		<header className={props.path}>
			<Link to={"/"}>
				<div className="logo">
					<img src={logo} alt="logo" />
					<h2 className="heading-5">
						Perfect
						<span className="special">Recipe</span>
					</h2>
				</div>
			</Link>
			<nav className="nav">
				<ul>
					<li>
						{!user.userLoggedIn && (
							<Link className="paragraph-3" to={"/"}>
								Home
							</Link>
						)}{" "}
					</li>
					<li>
						<Link className="paragraph-3" to={"/search"}>
							search
						</Link>
					</li>
					<li>
						<Link className="paragraph-3" to={"/recipe/random"}>
							Random Recipe
						</Link>
					</li>
				</ul>
			</nav>
			{user.userLoggedIn ? (
				<div
					className={`account ${
						props.displaySearch && "display-search"
					}`}
				>
					{props.displaySearch && (
						<div className="search">
							<FaSearch className="icon" />
							<input
								type="text"
								name="Search"
								id="search-input"
								placeholder="Search..."
								className="paragraph-2"
								onKeyDown={(e) =>
									e.key === "Enter" &&
									searchValue.setSearchValue(e.target.value)
								}
							/>
						</div>
					)}
					<Link
						title="favorites"
						to={"/favorites"}
						className="favorite-link"
					>
						<FaHeart></FaHeart>
					</Link>
					<button
						title="logout"
						onClick={() => handleClick()}
						className="logout button-shape secondary"
					>
						<IoMdLogOut />
					</button>
					<div className="profile">
						<img
							src={`https://ui-avatars.com/api/?background=random&color=fff&name=${
								user.currentUser?.displayname ||
								user.currentUser?.email
							}&font-size=0.5&rounded=true&bold=true`}
							alt=""
							className="pfp"
						/>
					</div>
				</div>
			) : (
				<>
					<div
						className={`account ${
							props.displaySearch && "display-search"
						}`}
					>
						{props.displaySearch && (
							<div className="search">
								<FaSearch className="icon" />
								<input
									type="text"
									name="Search"
									id="search-input"
									placeholder="Search..."
									className="paragraph-2"
									onKeyDown={(e) =>
										e.key === "Enter" &&
										searchValue.setSearchValue(
											e.target.value
										)
									}
								/>
							</div>
						)}

						<Link
							to="/login"
							className="login button-shape secondary"
						>
							Login
						</Link>
						<Link
							to="/sign-up"
							className="Sign-up button-shape primary"
						>
							Sign Up
						</Link>
					</div>
				</>
			)}
		</header>
	);
}
