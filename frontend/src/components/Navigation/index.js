import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import CreateGroupFormModal from "../CreateGroupModal";
import "./Navigation.css";
import { Nav, Navbar } from "react-bootstrap";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

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
				<Nav.Link exact="true" href="/NewGroups" />
			</>
		);
	}
	if (!isLoaded) return null;
	return (
		<Navbar bg="primary" variant="dark">
			<Nav className="mr-auto">
				<NavLink className="nav-link" exact="true" to={`/home`}>
					Home
				</NavLink>
				{sessionUser && (
					<NavLink className="nav-link" exact="true" to="/groups">
						Joined Groups
					</NavLink>
				)}
				<NavLink className="nav-link" exact="true" to="/NewGroups">
					Find New Groups
				</NavLink>
				{isLoaded && sessionLinks}
			</Nav>
		</Navbar>
	);
}

export default Navigation;
