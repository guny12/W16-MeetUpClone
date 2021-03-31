import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { Button } from "react-bootstrap";
import GroupTiles from "../GroupTilesComponent";

const Home = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	const groups = useSelector((state) => state.groups);
	// console.log(groups, "GROUPS HERE++++++++++ HOME+++++++++");
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
				<GroupTiles groups={groups} />
			</div>
			{privateGroups}
		</div>
	);
};

export default Home;
