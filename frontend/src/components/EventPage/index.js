import React, { useEffect } from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink, Redirect } from "react-router-dom";
import "./EventPage.css";
import Image from "react-bootstrap/Image";
import EditGroupFormModal from "../EditGroupModal";
import { Button, Jumbotron, Container } from "react-bootstrap";

const EventPage = () => {
	const history = useHistory();
	const { eventId } = useParams();
	const dispatch = useDispatch();
	const events = useSelector((state) => state.events);
	console.log(events, "EVENTS ------------------------------------------------");
	let { JoinedEvents, joinedEventIds, notJoinedUpcomingEvents, somePublicEvents } = events;
	const user = useSelector((state) => state.session.user);
	useEffect(() => dispatch(eventActions.getEvents()), [dispatch]);

	let isLoaded = events.joinedEventIds.length > 0 || Object.values(events.somePublicEvents).length > 1;

	function joinEvent(event) {
		return dispatch(eventActions.joinEvent({ event }))
			.then((response) => {
				history.go(0);
				return response;
			})
			.catch(async (res) => {
				throw res;
			});
	}

	// if eventId isn't one of the keys in that event, !! will return false.
	// if it is inside that event, !! will return true.

	let event;

	switch (true) {
		case !!JoinedEvents[`${eventId}`]:
			event = JoinedEvents[`${eventId}`];
			break;
		case !!notJoinedUpcomingEvents[`${eventId}`]:
			event = notJoinedUpcomingEvents[`${eventId}`];
			break;
		case !!somePublicEvents[`${eventId}`]:
			event = somePublicEvents[`${eventId}`];
			break;
		default:
			event = null;
	}

	let JoinOrEditButton = null;
	function eventRender(event) {
		if (event?.hostName === user.firstName) {
			JoinOrEditButton = <EditGroupFormModal event={event} />;
		} else if (!events.joinedEventIds.includes(event.id)) {
			JoinOrEditButton = (
				<Button variant="dark" onClick={() => joinEvent(event)}>
					JOIN Event
				</Button>
			);
		} else {
			JoinOrEditButton = <p>You are a member of this event!</p>;
		}

		if (event) {
			return (
				<>
					<Image fluid src={`${event?.imgURL}`}></Image>
					<h1>
						{event?.name}
						<p>{event?.description}</p>
						<p>{`${event?.count} ${event?.count > 1 || event?.count === 0 ? "Members" : "Member"} so far`}</p>
						<p>{`Organized By ${event?.hostName}`}</p>
						{JoinOrEditButton}
					</h1>
				</>
			);
		}
	}

	let noEvent = (
		<>
			<Image fluid src={"https://cdn.pixabay.com/photo/2014/04/02/16/29/scream-307414__340.png"}></Image>
			<h1>
				<NavLink to={"/home"}>
					Whoops! Can't find the event you tried to go to.
					<p /> It may have been deleted by the admin. <p /> CLICK HERE to go home.
				</NavLink>
			</h1>
		</>
	);

	if (!isLoaded) return null;

	return (
		<div className="eventPage__container">
			<div className="eventPage__header">
				<Jumbotron fluid>
					<Container>{isLoaded && event ? eventRender(event) : noEvent}</Container>
				</Jumbotron>
			</div>
			<div className="eventPage__header-Nav"></div>
		</div>
	);
};

export default EventPage;
