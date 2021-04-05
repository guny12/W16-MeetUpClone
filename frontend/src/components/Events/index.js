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
						{Object.values(events.notJoinedEvents).length > 0 && (
							<Button variant="dark" onClick={() => history.push("/events")}>
								see all
							</Button>
						)}
					</div>
					<div>
						{Object.values(events.notJoinedEvents).length < 1 && (
							<>
								<h1 style={{ margin: "50px", fontFamily: `"Rock Salt", cursive` }}>
									You've joined every event!
									<p style={{ margin: "50px" }} />
									<p> Go make some more!</p>
								</h1>
							</>
						)}
						<EventCarousel events={events} whatEvent={"notJoinedUpcomingEvents"} />
					</div>
				</>
			)}
			<div className="home__shelf-header">
				<h1>Some events you may be interested in </h1>
				{Object.values(events.somePublicEvents).length > 0 && (
					<Button variant="dark" onClick={() => history.push("/events")}>
						see all
					</Button>
				)}
			</div>
			{Object.values(events.somePublicEvents).length < 1 && (
				<h1 style={{ margin: "50px", fontFamily: `"Rock Salt", cursive` }}>
					You've joined every event!
					<p style={{ margin: "50px" }} />
					<p> Go make some more!</p>
				</h1>
			)}
			{Object.values(events.somePublicEvents).length > 0 && (
				<div>
					<EventCarousel events={events} whatEvent={"somePublicEvents"} />
				</div>
			)}
		</div>
	);
};

export default Events;
