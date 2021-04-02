import React, { useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./FindNewGroups.css";
import DeckCarousel from "../Carousel";
import { Button } from "react-bootstrap";

const FindNewGroups = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	const groups = useSelector((state) => state.groups);
	const signedIn = useSelector((state) => state.session.user?.id);
	// let isNewGroups = history.location.pathname === "/NewGroups" ? true : false;
	let isLoaded = groups.joinedGroupIds.length > 0 || Object.values(groups.newPublicGroups).length > 1;
	let newPrivateGroups = null,
		newPublicGroups = null;

	if (isLoaded) {
		if (Object.values(groups.newPrivateGroups).length > 0) {
			newPrivateGroups = (
				<>
					<div className="home__shelf-header">
						<div>
							<p style={{ marginTop: "50px" }} />
							<h1>Check Out These Private Groups</h1>
						</div>
						<Button variant="dark" onClick={() => history.push("/groups")}>
							see all
							{/* YOU NEED TO CHANGE THE PATH TO ALL PRIVATE GROUPS LIST */}
						</Button>
					</div>
					<div>
						<DeckCarousel groups={groups} whatGroup={"newPrivateGroups"} />
					</div>
				</>
			);
		} else {
			newPrivateGroups = (
				<>
					<div className="home__shelf-header">
						<div style={{ marginTop: "50px" }}>
							<h1>Check Out These Private Groups</h1>
							<h1 style={{ margin: "50px", fontFamily: `"Rock Salt", cursive` }}>
								You've Already Joined Every Private Group!
								<p style={{ margin: "50px" }} />
								<p> Go Make Your Own!</p>
							</h1>
						</div>
					</div>
				</>
			);
		}
	}

	if (isLoaded) {
		if (Object.values(groups.newPublicGroups).length > 0) {
			newPublicGroups = (
				<>
					<div className="home__shelf-header">
						<div>
							<p style={{ marginTop: "50px" }} />
							<h1>Check Out These Public Groups</h1>
						</div>
						<Button variant="dark" onClick={() => history.push("/groups")}>
							see all
							{/* YOU NEED TO CHANGE THE PATH TO ALL PRIVATE GROUPS LIST */}
						</Button>
					</div>
					<div>
						<DeckCarousel groups={groups} whatGroup={"newPublicGroups"} />
					</div>
				</>
			);
		} else {
			newPublicGroups = (
				<>
					<div className="home__shelf-header">
						<div style={{ marginTop: "50px" }}>
							<h1>Check Out These Public Groups</h1>
							{signedIn && (
								<h1 style={{ margin: "50px", fontFamily: `"Rock Salt", cursive` }}>
									You've Already Joined Every Public Group!
									<p style={{ margin: "50px" }} />
									<p> Go Make Your Own!</p>
								</h1>
							)}
						</div>
					</div>
				</>
			);
		}
	}

	return (
		<div className="home__container">
			{isLoaded && newPublicGroups}
			{isLoaded && newPrivateGroups}
		</div>
	);
};

export default FindNewGroups;
