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

	let isLoaded = events.joinedEventIds.length > 0 || Object.values(events.somePublicEvents).length > 1;

	if (!isLoaded) return null;
	return (
		<div className="home__container">
			{signedIn && (
				<>
					<div className="home__shelf-header">
						<h1>Your Joined Upcoming Events</h1>
						<Button variant="dark" onClick={() => history.push("/events")}>
							see all
						</Button>
					</div>
					<div>
						<EventCarousel events={events} whatEvent={"joinedUpcomingEvents"} />
					</div>
					<div className="home__shelf-header">
						<h1>Events In Your Groups, Not Joined</h1>
						<Button variant="dark" onClick={() => history.push("/events")}>
							see all
						</Button>
					</div>
					<div>
						<EventCarousel events={events} whatEvent={"notJoinedUpcomingEvents"} />
					</div>
				</>
			)}
			{/* {signedIn && privateGroups} */}
		</div>
	);
};

export default Events;
