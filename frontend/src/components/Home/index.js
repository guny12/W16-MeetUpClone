import React from "react";
// import * as groupActions from "../../store/group";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./Home.css";
// import { Button, Carousel } from "react-bootstrap";
// import DeckCarousel from "../Carousel";
import Groups from "../Groups";
import FindNewGroups from "../FindNewGroups";

const Home = ({ isLoaded }) => {
	// const history = useHistory();
	// const dispatch = useDispatch();
	const signedIn = useSelector((state) => state.session.user?.id);
	// useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	// const groups = useSelector((state) => state.groups);

	return (
		<div>
			{signedIn && <h1>Welcome back! Your Upcoming and other Nearby Events Here</h1>}
			{!signedIn && <h1>Put a message here explaining app/login/signup</h1>}
			{signedIn && <Groups />}
			{!signedIn && <FindNewGroups />}
		</div>
	);
};

export default Home;
