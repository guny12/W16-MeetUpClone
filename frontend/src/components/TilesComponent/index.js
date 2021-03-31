import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./TilesComponent.css";
// import { Button, Form } from "react-bootstrap";

const Tiles = () => {
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.groups);

	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);

	console.log(groups, "GROUPS HERE===========");
	return (
		<div className="home__container">
			<h1>Public Groups</h1>
			<h1>Private Groups</h1>
		</div>
	);
};

export default Tiles;
