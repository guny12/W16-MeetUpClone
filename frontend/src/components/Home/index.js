import React from "react";
// import * as groupActions from "../../store/group";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./Home.css";
// import { Button, Carousel } from "react-bootstrap";
// import DeckCarousel from "../Carousel";
import Groups from "../Groups";
import FindNewGroups from "../FindNewGroups";
import Events from "../Events";

const Home = ({ isLoaded }) => {
	// const history = useHistory();
	// const dispatch = useDispatch();
	const signedIn = useSelector((state) => state.session.user?.id);
	const userFirstName = useSelector((state) => state.session.user?.firstName);
	// useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);
	// const groups = useSelector((state) => state.groups);

	return (
		<div>
			{signedIn && (
				<>
					<h1
						style={{ margin: "5px", fontFamily: `"Rock Salt", cursive` }}
					>{`Lets get cooking off, ${userFirstName}!`}</h1>{" "}
					<Events /> <Groups />
				</>
			)}
			{!signedIn && (
				<>
					<h4
						style={{
							marginLeft: "20%",
							marginTop: "1%",
							padding: "1%px",
							marginBottom: "-1%px",
							fontFamily: `"Rock Salt", cursive`,
						}}
					>
						Welcome to Cook Off!
						<p>Pick groups to join where you can meet other cooks. </p>
						<p>Discuss, cook off against each other, cater events, experiment and learn things.</p>
						<p>Groups have Events that you can join if you are a part of them. </p>
						<p>Sign Up to get full access, or try the demo user.</p>
					</h4>
					<Events />
					<FindNewGroups />
				</>
			)}
		</div>
	);
};

export default Home;
