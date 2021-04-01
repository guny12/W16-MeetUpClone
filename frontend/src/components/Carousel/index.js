import React, { Component } from "react";
import "./Carousel.css";
import GroupTiles from "../GroupTilesComponent";
import Slider from "react-slick";
import { Card, CardDeck } from "react-bootstrap";

function DeckCarousel({ groups, isPrivate }) {
	let { publicGroups, privateGroups } = groups;
	let targetGroups = isPrivate ? privateGroups : publicGroups;

	const settings = {
		dots: true,
		infinite: true,
		speed: 1250,
		slidesToScroll: 5,
		slidesToShow: 5,
		adaptiveHeight: true,
	};

	let cards = Object.values(targetGroups).map((group) => (
		<div>
			<Card key={`card-${group.id}`}>
				<a href={`/${group.id}`}>
					<Card.Img variant="top" src={`${group.imgURL}`} />
					<Card.Body>
						<Card.Title>{group.name}</Card.Title>
						<Card.Text>
							<span>{group.description}</span>
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">{`${group.count} Members`}</small>
					</Card.Footer>
				</a>
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
