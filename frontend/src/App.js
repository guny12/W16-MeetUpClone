import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import Groups from "../src/components/Groups";
import FindNewGroups from "../src/components/FindNewGroups";
import Home from "../src/components/Home";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then((response) => (response.ok ? setIsLoaded(true) : null));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/groups" exact>
						<Groups />
					</Route>
					<Route path="/NewGroups" exact>
						<FindNewGroups />
					</Route>
					<Route path="/home" exact>
						<Home />
					</Route>
					<Route path="/">
						<Redirect to="/home" />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
