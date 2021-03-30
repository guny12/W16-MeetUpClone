import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUpModal";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then((response) => (response.ok ? setIsLoaded(true) : null));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{/* {isLoaded && (
				<Switch>
					<Route path="/signup">
						<SignUpPage />
					</Route>
				</Switch>
			)} */}
		</>
	);
}

export default App;
