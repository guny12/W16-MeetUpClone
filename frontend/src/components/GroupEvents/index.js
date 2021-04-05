import React, { useEffect } from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./GroupEvents.css";
import EventCarousel from "../EventCarousel";
import { Button } from "react-bootstrap";

const GroupEvents = ({ group }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => dispatch(eventActions.getGroupEvents(group.id)), [dispatch]);
	const events = useSelector((state) => state.events);
	const signedIn = useSelector((state) => state.session.user?.id);
	console.log(events, "EVENTS----------------");
	let isLoaded = events.joinedGroupEventIds.length > 0 || Object.values(events.PreviousEvents).length > 1;

	if (!isLoaded) return null;
	return (
		<div className="home__container">
			{signedIn && (
				<>
					<div className="groupEvent__shelf-header">
						<h1>{`Upcoming ${group.name} events you've joined`}</h1>
						{Object.values(events.JoinedUpcomingGroupEvents).length > 0 && (
							<Button variant="dark" onClick={() => history.push("/events")}>
								see all
							</Button>
						)}
					</div>
					<div>
						<EventCarousel events={events} whatEvent={"JoinedUpcomingGroupEvents"} />
					</div>
					<div className="groupEvent__shelf-header">
						<h1>{`Upcoming ${group.name} events you haven't joined`}</h1>
						{Object.values(events.NotJoinedUpcomingGroupEvents).length > 0 && (
							<Button variant="dark" onClick={() => history.push("/events")}>
								see all
							</Button>
						)}
					</div>
					<div>
						{Object.values(events.NotJoinedUpcomingGroupEvents).length < 1 && (
							<>
								<h1 style={{ margin: "50px", fontFamily: `"Rock Salt", cursive` }}>
									You've joined every event!
									<p style={{ margin: "50px" }} />
									<p> Go make some more!</p>
								</h1>
							</>
						)}
						<EventCarousel events={events} whatEvent={"NotJoinedUpcomingGroupEvents"} />
					</div>
				</>
			)}
			<div className="groupEvent__shelf-header">
				<h1>Previous Events </h1>
				{Object.values(events.PreviousEvents).length > 0 && (
					<Button variant="dark" onClick={() => history.push("/events")}>
						see all
					</Button>
				)}
			</div>
			{Object.values(events.PreviousEvents).length < 1 && (
				<h1 style={{ margin: "50px", fontFamily: `"Rock Salt", cursive` }}>No Previous Events!</h1>
			)}
			{Object.values(events.PreviousEvents).length > 0 && (
				<div>
					<EventCarousel events={events} whatEvent={"PreviousEvents"} />
				</div>
			)}
		</div>
	);
};

export default GroupEvents;
