/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";

const searchValueContext = React.createContext();

export function useSearchValue() {
	return useContext(searchValueContext);
}

export function SearchValueProvider({ children }) {
	const [searchValue, setSearchValue] = useState("");

	const value = {
		searchValue,
		setSearchValue,
	};

	return (
		<searchValueContext.Provider value={value}>
			{children}
		</searchValueContext.Provider>
	);
}
