import blob from "../assets/blob (1).svg";
import dish from "../assets/pngegg.png";
import "../styles/hero.css";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Hero() {
	window.scrollTo(0, 0);

	let user = useAuth();

	if (user.userLoggedIn) Navigate({ to: "/search" });

	return (
		<main className="hero">
			<div className="blob">
				{" "}
				<img src={blob} alt="blob" />{" "}
			</div>
			<div className="content">
				<div className="text">
					<h1 className="heading-1">
						your daily dish a <span className="special">food</span>{" "}
						journey
					</h1>
					<p className="paragraph-2 description">
						Fresh, flavorful and {"(mostly)"} healthy recipes made
						for real, actual, every day life. Helping you celebrate
						the joy of food in a totally non-intimidating way.
					</p>
					<Link
						to={"/sign-up"}
						className="button-shape primary sign-up"
					>
						Sign Up
					</Link>
					<div className="p paragraph-3 login">
						Do you have an account
						<Link to={"/login"}>
							<span className="special">Login!</span>
						</Link>
					</div>
				</div>
				<div className="image">
					<img src={dish} alt="" />
				</div>
			</div>
		</main>
	);
}
