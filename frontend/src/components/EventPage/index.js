import React, { useEffect } from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink, Redirect } from "react-router-dom";
import "./EventPage.css";
import Image from "react-bootstrap/Image";
import EditGroupFormModal from "../EditGroupModal";
import { Button, Jumbotron, Container } from "react-bootstrap";
import { parseISO } from "date-fns";

const EventPage = () => {
	const history = useHistory();
	const { eventId } = useParams();
	const dispatch = useDispatch();
	const events = useSelector((state) => state.events);
	console.log(events, "EVENTS ------------------------------------------------");
	let { JoinedEvents, joinedEventIds, notJoinedEvents, somePublicEvents } = events;
	const user = useSelector((state) => state.session.user);
	useEffect(() => dispatch(eventActions.getEvents()), [dispatch]);

	let isLoaded = events.joinedEventIds.length > 0 || Object.values(events.somePublicEvents).length > 1;

	function joinEvent(event) {
		if (!user?.firstName) document.getElementById("loginButton").click();
		else {
			return dispatch(eventActions.joinEvent({ event }))
				.then((response) => {
					history.go(0);
					return response;
				})
				.catch(async (res) => {
					throw res;
				});
		}
	}

	// if eventId isn't one of the keys in that event, !! will return false.
	// if it is inside that event, !! will return true.

	let event;

	switch (true) {
		case !!JoinedEvents[`${eventId}`]:
			event = JoinedEvents[`${eventId}`];
			break;
		case !!notJoinedEvents[`${eventId}`]:
			event = notJoinedEvents[`${eventId}`];
			break;
		case !!somePublicEvents[`${eventId}`]:
			event = somePublicEvents[`${eventId}`];
			break;
		default:
			event = null;
	}

	let JoinOrEditButton = null;
	function eventRender(event) {
		if (event?.hostName === user?.firstName) {
			JoinOrEditButton = <EditGroupFormModal event={event} />;
		} else if (!events.joinedEventIds.includes(event.id)) {
			JoinOrEditButton = (
				<Button variant="dark" onClick={() => joinEvent(event)}>
					Join Event
				</Button>
			);
		} else {
			JoinOrEditButton = <p>You've joined this event!</p>;
		}

		if (event) {
			return (
				<>
					<Image fluid src={`${event?.imgURL}`}></Image>
					<h1>
						{event?.name}
						<p>{event?.description}</p>
						<p>{`Hosted by: ${event?.hostName}`}</p>
						<p>{`Location: ${event?.location}`}</p>
						<p>{`When: ${parseISO(event?.eventDate).toString().slice(0, 24)}`}</p>
						<p>{`${event?.availableSpots} available spots left`}</p>
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
