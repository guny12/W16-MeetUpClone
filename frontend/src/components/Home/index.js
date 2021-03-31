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
	// console.log(groups, "GROUPS HERE===========");
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);

	// if (Object.values(groups.privateGroups).length > 0) privateGroups = groups.privateGroups;
	// console.log(privateGroups, "PRIVATE GROUPS *******************");

	let privateGroups = null;
	if (Object.values(groups.privateGroups).length > 0) {
		privateGroups = (
			<>
				<div className="home__shelf-header">
					<div>
						<h1>Private Groups</h1>
					</div>
					<Button variant="dark" onClick={() => history.push("/events")}>
						see all
					</Button>
				</div>
				<div className="home__shelf-body">
					<h1> INSERT CARD COMPONENTS HERE</h1>
				</div>
			</>
		);
	} else {
		privateGroups = null;
	}

	return (
		<div className="home__container">
			<div className="home__shelf-header">
				<div>
					<h1>Public Groups</h1>
				</div>
				<Button variant="dark" onClick={() => history.push("/groups")}>
					see all
				</Button>
			</div>
			<div className="home__shelf-body">
				<h1> INSERT CARD COMPONENTS HERE</h1>
			</div>
			{privateGroups}
		</div>
	);
};

export default Home;
