import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import CreateGroupFormModal from "../CreateGroupModal";
import "./Navigation.css";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Nav, Navbar, Button } from "react-bootstrap";

function Navigation({ isLoaded }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<>
				<CreateGroupFormModal /> <div style={{ marginRight: "20px" }}></div> <ProfileButton user={sessionUser} />
			</>
		);
	} else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<SignUpModal />
				<Button variant="dark" onClick={() => handleSubmit()}>
					Demo User
				</Button>
				<Nav.Link exact="true" href="/NewGroups" />
			</>
		);
	}

	const handleSubmit = () => {
		setErrors([]);
		return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
			.then((response) => (response.ok ? history.push("/home") : response))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	if (!isLoaded) return null;
	return (
		<Navbar bg="primary" variant="dark">
			<Nav className="mr-auto">
				<NavLink className="nav-link" to={`/home`}>
					Home
				</NavLink>
				{sessionUser && (
					<>
						<NavLink className="nav-link" to="/groups">
							Joined Groups
						</NavLink>
					</>
				)}
				<NavLink className="nav-link" to="/NewGroups">
					Find New Groups
				</NavLink>{" "}
				<NavLink className="nav-link" to="/events">
					Events
				</NavLink>
				{isLoaded && sessionLinks}
			</Nav>
		</Navbar>
	);
}

export default Navigation;
