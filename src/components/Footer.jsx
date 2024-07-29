import "../styles/footer.css";
import logo from "../assets/fork.png";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

export default function SearchPage() {
	let user = useAuth();

	let navigate = useNavigate();

	async function handleClick() {
		await doSignOut().then(() => {
			console.log("signed out", user.userLoggedIn);
			navigate("/");
		});
	}

	return (
		<footer>
			<div className="top">
				<div className="column">
					<div className="logo">
						<Link to="/">
							<img src={logo} alt="logo" />
							<h2 className="heading-5">
								Perfect
								<span className="special">Recipe</span>
							</h2>
						</Link>
					</div>
					<div className="description">
						Fresh, flavorful and {"(mostly)"} healthy recipes made
						for real, actual, every day life. Helping you celebrate
						the joy of food in a totally non-intimidating way.
					</div>
				</div>
				<div className="column">
					<h5 className="heading-5">Quick Links</h5>
					<ul className="links">
						<li>
							<Link to="/" className="link">
								Home
							</Link>
						</li>
						<li>
							<Link to="/Search" className="link">
								Search
							</Link>
						</li>
						<li>
							<Link to="/recipe/random" className="link">
								Random Recipe
							</Link>
						</li>
					</ul>
				</div>
				<div className="column">
					<h5 className="heading-5">
						{user.userLoggedIn ? "Log Out" : "Login/Sign up"}
					</h5>
					<div className="account">
						{user.userLoggedIn ? (
							<button
								onClick={() => handleClick()}
								className="logout button-shape secondary"
							>
								log out
							</button>
						) : (
							<>
								<Link
									to="/login"
									className="login button-shape secondary"
								>
									Login
								</Link>
								<Link
									to={"/sign-up"}
									className="Sign-up button-shape primary"
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="bottom">
				<div className="rights">
					&copy; Copyright {new Date().getFullYear()} make with ❤ from
					food lovers to food lovers
				</div>
				<div className="contact-me">
					<a
						target="_blank"
						href="https://github.com/Sami-Codes"
						className="contact-link"
					>
						<FaGithub />
					</a>
					<a
						target="_blank"
						href="https://x.com/Sami_dev_"
						className="contact-link"
					>
						<FaXTwitter />
					</a>
					<a
						target="_blank"
						href="https://www.themealdb.com/api.php"
						className="contact-link"
					>
						<TbApi />
					</a>
				</div>
			</div>
		</footer>
	);
}
