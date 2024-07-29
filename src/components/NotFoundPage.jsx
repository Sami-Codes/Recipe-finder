import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

export default function NotFoundPage() {
	return (
		<main className="page-not-found">
			<div className="text">
				<h1 className="page-not-found">page not found</h1>
				<p>
					Go To :
					<Link to={"/"} className="not-found-link">
						Home Page
					</Link>
					Or
					<Link to={"/search"} className="not-found-link">
						Search Page
					</Link>
				</p>
			</div>
		</main>
	);
}
