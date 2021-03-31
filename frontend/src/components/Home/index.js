import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { Button, Carousel } from "react-bootstrap";
import DeckCarousel from "../Carousel";
import Groups from "../Groups";

const Home = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	const groups = useSelector((state) => state.groups);

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
				<div>
					<DeckCarousel groups={groups} isPrivate={"yes"} />
				</div>
			</>
		);
	}

	return <Groups></Groups>;
};

export default Home;
