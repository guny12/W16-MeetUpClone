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

	return (
		<div>
			<h1>Welcome back! Your Upcoming Events Here</h1>
			<Groups></Groups>{" "}
		</div>
	);
};

export default Home;
