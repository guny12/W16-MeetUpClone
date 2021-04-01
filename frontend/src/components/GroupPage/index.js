import React, { useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./GroupPage.css";
import DeckCarousel from "../Carousel";
import Image from "react-bootstrap/Image";
import { Button, Card, Jumbotron, Container } from "react-bootstrap";

const GroupPage = () => {
	const history = useHistory();
	const { groupId } = useParams();
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.groups);
	let { publicGroups, privateGroups, newPrivateGroups, newPublicGroups } = groups;
	const signedIn = useSelector((state) => state.session.user?.id);
	const user = useSelector((state) => state.session.user);
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);

	// if groupId isn't one of the keys in that group, !! will return false.
	// if it is inside that group, !! will return true.
	// console.log(!!publicGroups[`${groupId}`], "GROUP HERE------------------");
	let group;
	switch (true) {
		case !!newPrivateGroups[`${groupId}`]:
			group = newPrivateGroups[`${groupId}`];
			break;
		case !!privateGroups[`${groupId}`]:
			group = privateGroups[`${groupId}`];
			break;
		case !!newPublicGroups[`${groupId}`]:
			group = newPublicGroups[`${groupId}`];
			break;
		case !!publicGroups[`${groupId}`]:
			group = publicGroups[`${groupId}`];
			break;
		default:
			group = null;
	}

	console.log(group, "group");
	return (
		<div className="groupPage__container">
			<div className="groupPage__header">
				<Jumbotron fluid>
					<Container>
						<Image fluid src={`${group?.imgURL}`}></Image>
						<h1>
							{group?.name}
							<p>{group?.description}</p>
							<p>{`${group?.count} ${group?.count > 1 || group?.count === 0 ? "Members" : "Member"} so far`}</p>
							<p>{`${group?.isPublic ? "Public" : "Private"} Group`}</p>
							<p>{`Organized By ${user?.firstName}`}</p>
						</h1>
					</Container>
				</Jumbotron>
			</div>
			<div className="groupPage__header-Nav"></div>
		</div>
	);
};

export default GroupPage;
