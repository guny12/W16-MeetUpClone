import React, { useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./FindNewGroups.css";
// import VerticalCarousel from "../VerticalCarousel ";
import DeckCarousel from "../Carousel";
import { Button } from "react-bootstrap";

const FindNewGroups = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	const groups = useSelector((state) => state.groups);
	const signedIn = useSelector((state) => state.session.user?.id);
	let isNewGroups = history.location.pathname === "/NewGroups" ? true : false;

	let newPrivateGroups = null;

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

	return (
		<div className="home__container">
			<div className="home__shelf-header">
				<div>
					{isNewGroups && <h1> Check Out These Public Groups</h1>}
					{signedIn && !isNewGroups && <h1>Joined Public Groups</h1>}
				</div>
				<Button variant="dark" onClick={() => history.push("/groups")}>
					see all
					{/* YOU NEED TO CHANGE THE PATH TO ALL PUBLIC GROUPS LIST */}
				</Button>
			</div>
			<div>
				<DeckCarousel groups={groups} whatGroup={"newPublicGroups"} />
			</div>
			{newPrivateGroups}
		</div>
	);
};

export default FindNewGroups;
