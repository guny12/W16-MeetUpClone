import React from "react";
// import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
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
			</>
		);
	}

	return (
		<Navbar bg="primary" variant="dark">
			<Nav className="mr-auto">
				<Nav.Link exact="true" href="/">
					Home
				</Nav.Link>
				<Nav.Link exact="true" href="/group">
					Groups
				</Nav.Link>
				{isLoaded && sessionLinks}
			</Nav>
		</Navbar>
	);
}

export default Navigation;
