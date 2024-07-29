import Header from "./components/Header";
import Hero from "./components/Hero.jsx";
import SearchPage from "./components/SearchPage.jsx";
import RecipePage from "./components/RecipePage.jsx";
import Footer from "./components/Footer.jsx";
import SignUp from "./components/SignUp.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext/index.jsx";
import { SearchValueProvider } from "./contexts/searchValue.context.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import FavoritePage from "./components/FavoritePage.jsx";

function App() {
	return (
		<AuthProvider>
			<SearchValueProvider>
				<Routes>
					<Route path="*" element={<NotFoundPage />}></Route>
					<Route
						path="/"
						element={
							<>
								<Header path="home"></Header>
								<Hero></Hero>
							</>
						}
					></Route>
					<Route
						path="/search"
						element={
							<>
								<Header
									displaySearch={true}
									path="search"
								></Header>
								<SearchPage></SearchPage>
								<Footer></Footer>
							</>
						}
					></Route>
					<Route
						path="/sign-up"
						element={
							<>
								<Header path="sign-up"></Header>
								<SignUp path="sign-up"></SignUp>
								<Footer></Footer>
							</>
						}
					></Route>
					<Route
						path="/login"
						element={
							<>
								<Header path="sign-up"></Header>
								<SignUp path="login"></SignUp>
								<Footer></Footer>
							</>
						}
					></Route>
					<Route
						path="/recipe/:id"
						element={
							<>
								<Header path="search"></Header>
								<RecipePage></RecipePage>
								<Footer></Footer>
							</>
						}
					></Route>
					<Route
						path="/favorites"
						element={
							<>
								<Header path="search"></Header>
								<FavoritePage></FavoritePage>
								<Footer></Footer>
							</>
						}
					></Route>
				</Routes>
			</SearchValueProvider>
		</AuthProvider>
	);
}

export default App;
