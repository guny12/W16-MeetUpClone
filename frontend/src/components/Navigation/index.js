import React from "react";
// import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import FindNewGroups from "../FindNewGroups";
import "./Navigation.css";
import { Nav, Navbar } from "react-bootstrap";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<SignUpModal />
				<Nav.Link exact="true" href="/NewGroups" />
			</>
		);
	}

	return (
		<Navbar bg="primary" variant="dark">
			<Nav className="mr-auto">
				<Nav.Link exact="true" href="/home">
					Home
				</Nav.Link>
				{sessionUser && (
					<Nav.Link exact="true" href="/groups">
						Joined Groups
					</Nav.Link>
				)}
				<Nav.Link exact="true" href="/NewGroups">
					Find New Groups
				</Nav.Link>
				{isLoaded && sessionLinks}
			</Nav>
		</Navbar>
	);
}

export default Navigation;
