import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Groups.css";
import VerticalCarousel from "../VerticalCarousel ";
import DeckCarousel from "../Carousel";
import { Button } from "react-bootstrap";

const Groups = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	const groups = useSelector((state) => state.groups);

	let isGroups = history.location.pathname === "/groups" ? true : false;

	let privateGroups = null;
	if (Object.values(groups.privateGroups).length > 0) {
		privateGroups = (
			<>
				<div className="home__shelf-header">
					<div>
						<h1>Private Groups</h1>
					</div>
					<Button variant="dark" onClick={() => history.push("/groups")}>
						see all
					</Button>
				</div>
				<div>
					{isGroups && <VerticalCarousel groups={groups} isPrivate={"yes"} />}
					{!isGroups && <DeckCarousel groups={groups} isPrivate={"yes"} />}
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
			<div>
				{isGroups && <VerticalCarousel groups={groups} />}
				{!isGroups && <DeckCarousel groups={groups} />}
			</div>
			{privateGroups}
		</div>
	);
};

export default Groups;
