import React, { useEffect } from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Events.css";
import EventCarousel from "../EventCarousel";
import { Button } from "react-bootstrap";

const Events = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(eventActions.getEvents()), [dispatch]);
	const events = useSelector((state) => state.events);
	console.log(events, "EVENTS---------------------------");
	const signedIn = useSelector((state) => state.session.user?.id);

	// let isLoaded = events.joinedEventIds.length > 0 || Object.values(events.JoinedPublicEvents).length > 1;
	// let privateGroups = null;

	// if (!isLoaded) return null;
	return (
		<div className="home__container">
			<div className="home__shelf-header">
				<div>{signedIn && <h1>Your Upcoming Events</h1>}</div>
				<Button variant="dark" onClick={() => history.push("/events")}>
					see all
					{/* YOU NEED TO CHANGE THE PATH TO ALL PUBLIC GROUPS LIST */}
				</Button>
			</div>
			<div>
				<EventCarousel events={events} whatEvent={"joinedUpcomingEvents"} />
			</div>
			{/* {signedIn && privateGroups} */}
		</div>
	);
};

export default Events;
