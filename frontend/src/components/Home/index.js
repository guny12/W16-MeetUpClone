import React, { useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./Home.css";
// import { Button, Carousel } from "react-bootstrap";
// import DeckCarousel from "../Carousel";
import Groups from "../Groups";

const Home = () => {
	// const history = useHistory();
	const dispatch = useDispatch();
	const signedIn = useSelector((state) => state.session.user?.id);
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	// const groups = useSelector((state) => state.groups);

	return (
		<div>
			{signedIn && <h1>Welcome back! Your Upcoming and other Nearby Events Here</h1>}
			<Groups></Groups>
		</div>
	);
};

export default Home;
