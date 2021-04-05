import React, { useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import "./GroupPage.css";
import Image from "react-bootstrap/Image";
import EditGroupFormModal from "../EditGroupModal";
import CreateEventFormModal from "../CreateEventModal";
import { Button, Jumbotron, Container } from "react-bootstrap";
import GroupEvents from "../GroupEvents";

const GroupPage = () => {
	const history = useHistory();
	const { groupId } = useParams();
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.groups);
	let { publicGroups, privateGroups, newPrivateGroups, newPublicGroups } = groups;
	const user = useSelector((state) => state.session.user);
	useEffect(() => dispatch(groupActions.getGroups()), [dispatch]);

	let isLoaded = groups.joinedGroupIds.length > 0 || Object.values(groups.newPublicGroups).length > 1;

	function joinGroup(group) {
		if (!user?.firstName) document.getElementById("loginButton").click();
		else {
			return dispatch(groupActions.joinGroup({ group }))
				.then((response) => {
					history.go(0);
					return response;
				})
				.catch(async (res) => {
					throw res;
				});
		}
	}

	// if groupId isn't one of the keys in that group, !! will return false.
	// if it is inside that group, !! will return true.

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

	let JoinOrEditButton = null;
	function groupRender(group) {
		if (group?.adminName === user?.firstName) {
			JoinOrEditButton = (
				<>
					<EditGroupFormModal group={group} /> <CreateEventFormModal group={group} />
				</>
			);
		} else if (!groups.joinedGroupIds.includes(group.id)) {
			JoinOrEditButton = (
				<Button variant="dark" onClick={() => joinGroup(group)}>
					JOIN GROUP
				</Button>
			);
		} else {
			JoinOrEditButton = (
				<>
					<p>You are a member of this group!</p>
					<CreateEventFormModal group={group} />
				</>
			);
		}

		if (group) {
			return (
				<>
					<Image fluid src={`${group?.imgURL}`}></Image>
					<h1>
						{group?.name}
						<p>{group?.description}</p>
						<p>{`${group?.count} ${group?.count > 1 || group?.count === 0 ? "Members" : "Member"} so far`}</p>
						<p>{`${group?.isPublic ? "Public" : "Private"} Group`}</p>
						<p>{`Organized By ${group?.adminName}`}</p>
						{JoinOrEditButton}
					</h1>
				</>
			);
		}
	}

	let noGroup = (
		<>
			<Image fluid src={"https://cdn.pixabay.com/photo/2014/04/02/16/29/scream-307414__340.png"}></Image>
			<h1>
				<NavLink to={"/home"}>
					Whoops! Can't find the group you tried to go to.
					<p /> It may have been deleted by the admin. <p /> CLICK HERE to go home.
				</NavLink>
			</h1>
		</>
	);

	if (!isLoaded) return null;

	return (
		<div className="groupPage__container">
			<div className="groupPage__header">
				<Jumbotron fluid>
					<Container>{isLoaded && group ? groupRender(group) : noGroup}</Container>
				</Jumbotron>
			</div>
			<div className="groupPage__header-Nav"></div>
			<div className="groupPage__Events-header"></div>
			<GroupEvents group={group} />
		</div>
	);
};

export default GroupPage;
