import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Groups.css";
// import { Button, Form } from "react-bootstrap";

const Groups = () => {
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.groups);

	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);

	console.log(groups, "GROUPS HERE===========");
	return (
		<>
			<h1>TESTING</h1>
		</>
	);
};

export default Groups;
