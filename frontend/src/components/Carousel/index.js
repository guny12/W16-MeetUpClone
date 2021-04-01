import React from "react";
import { NavLink } from "react-router-dom";
import "./Carousel.css";
import Slider from "react-slick";
import { Card } from "react-bootstrap";

function DeckCarousel({ groups, whatGroup }) {
	let { publicGroups, privateGroups, newPrivateGroups, newPublicGroups } = groups;
	let targetGroups;

	switch (whatGroup) {
		case "privateGroups":
			targetGroups = privateGroups;
			break;
		case "newPrivateGroups":
			targetGroups = newPrivateGroups;
			break;
		case "newPublicGroups":
			targetGroups = newPublicGroups;
			break;
		default:
			targetGroups = publicGroups;
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 1250,
		slidesToScroll: 5,
		slidesToShow: 5,
		adaptiveHeight: true,
	};

	let cards = Object.values(targetGroups).map((group) => (
		<div key={`card-${whatGroup}${group.id}`}>
			<Card>
				<NavLink exact to={`/${group.id}`}>
					<Card.Img variant="top" src={`${group.imgURL}`} />
					<Card.Body>
						<Card.Title>{group.name}</Card.Title>
						<Card.Text>
							<span>{group.description}</span>
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">{`${group?.count} ${
							group?.count > 1 || group?.count === 0 ? "Members" : "Member"
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

export default DeckCarousel;
