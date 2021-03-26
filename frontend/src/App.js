import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

function App() {
	return (
		<>
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
				integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
				crossorigin="anonymous"
			/>
			<Switch>
				<Route path="/login">
					<LoginFormPage />
				</Route>
			</Switch>
		</>
	);
}

export default App;
