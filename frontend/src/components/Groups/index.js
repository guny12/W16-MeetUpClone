import React, { useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Groups.css";
import DeckCarousel from "../Carousel";
import { Button } from "react-bootstrap";

const Groups = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	const groups = useSelector((state) => state.groups);
	const signedIn = useSelector((state) => state.session.user?.id);

	let isLoaded = groups.joinedGroupIds.length > 0 || Object.values(groups.newPublicGroups).length > 1;
	let privateGroups = null;

	if (isLoaded) {
		if (Object.values(groups.privateGroups).length > 0) {
			privateGroups = (
				<>
					<div className="home__shelf-header">
						<div>{signedIn && <h1>Joined Private Groups</h1>}</div>
						<Button variant="dark" onClick={() => history.push("/groups")}>
							see all
							{/* YOU NEED TO CHANGE THE PATH TO ALL PRIVATE GROUPS LIST */}
						</Button>
					</div>
					<div>
						<DeckCarousel groups={groups} whatGroup={"privateGroups"} />
					</div>
				</>
			);
		}
		if (!Object.values(groups.privateGroups).length && isLoaded) {
			privateGroups = (
				<>
					<div className="home__shelf-header">
						<div style={{ marginTop: "50px" }}>
							<h1>Joined Private Groups</h1>
							<h1 style={{ margin: "50px", fontFamily: `"Rock Salt", cursive` }}>
								You Haven't Joined Any Private Groups Yet!
								<p style={{ margin: "50px" }} />
								<p> Go Join Some or Make Your Own!</p>
							</h1>
						</div>
					</div>
				</>
			);
		}
	}

	if (!isLoaded) return null;
	return (
		<div className="home__container">
			<div className="home__shelf-header">
				<div>
					{!signedIn && <h1> Public Groups</h1>}
					{signedIn && <h1>Joined Public Groups</h1>}
				</div>
				<Button variant="dark" onClick={() => history.push("/groups")}>
					see all
					{/* YOU NEED TO CHANGE THE PATH TO ALL PUBLIC GROUPS LIST */}
				</Button>
			</div>
			<div>
				<DeckCarousel groups={groups} whatGroup={"publicGroups"} />
			</div>
			{signedIn && privateGroups}
		</div>
	);
};

export default Groups;
