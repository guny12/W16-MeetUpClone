import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { Button } from "react-bootstrap";

const Home = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.groups);

	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);

	console.log(groups, "GROUPS HERE===========");
	return (
		<div className="home__container">
			<div className="home__shelf-header">
				<div>
					<h1>Public Groups</h1>
				</div>
				<Button variant="light" onClick={() => history.push("/groups")}>
					see all
				</Button>
			</div>
			<div className="home__shelf-body">
				<h1> TESTING</h1>
			</div>
			<h1>Private Groups</h1>
		</div>
	);
};

export default Home;
