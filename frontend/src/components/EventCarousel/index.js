import React from "react";
import { NavLink } from "react-router-dom";
import "./EventCarousel.css";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import { format, compareAsc, parseISO } from "date-fns";

function EventCarousel({ events, whatEvent }) {
	let { JoinedEvents, notJoinedEvents, somePublicEvents, previousJoinedEvents, joinedEventIds } = events;
	let targetEvents;

	switch (whatEvent) {
		case "joinedUpcomingEvents":
			targetEvents = JoinedEvents;
			break;
		case "notJoinedUpcomingEvents":
			targetEvents = notJoinedEvents;
			break;
		case "previousEvents":
			targetEvents = previousJoinedEvents;
			break;
		default:
			targetEvents = somePublicEvents;
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 1250,
		slidesToScroll: 5,
		slidesToShow: 5,
		adaptiveHeight: true,
	};

	let cards = Object.values(targetEvents).map((Event) => (
		<div key={`card-${whatEvent}${Event.id}`}>
			<Card>
				<NavLink to={`/${Event.id}`}>
					<Card.Img variant="top" src={`${Event.imgURL}`} />
					<Card.Body>
						<Card.Title>{Event.name}</Card.Title>
						<Card.Text className="event-body">
							<span>{Event.description}</span>
							<p>{`Hosted by: ${Event.hostName}`}</p>
							<p>{`Event Location: ${Event.location}`}</p>
							<p>{`Event Date: ${parseISO(Event.eventDate)}`}</p>
							<p>{`Event Date: ${new Date(Event.eventDate).toISOString()}`}</p>
							<p>{`${Event.availableSpots} available spots left`}</p>
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">{`${Event?.count} ${
							Event?.count > 1 || Event?.count === 0 ? "Members" : "Member"
						} so far`}</small>
					</Card.Footer>
				</NavLink>
			</Card>
		</div>
	));

	return (
		<div>
			<Slider {...settings}>{cards}</Slider>
		</div>
	);
}

export default EventCarousel;
