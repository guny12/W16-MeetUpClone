import React, { Component } from "react";
import "./Carousel.css";
import GroupTiles from "../GroupTilesComponent";
import Slider from "react-slick";
import { Card, CardDeck } from "react-bootstrap";

function DeckCarousel({ groups, isPrivate }) {
	let { publicGroups, privateGroups } = groups;
	let targetGroups = isPrivate ? privateGroups : publicGroups;

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToScroll: 4,
		slidesToShow: 4,
		adaptiveHeight: true,
	};

	console.log(Object.values(targetGroups)[0], "OBJVALS TARGET GROUP----------");
	if (Object.values(targetGroups).length > 1) var group = Object.values(targetGroups)[0];
	return (
		<div>
			<h2>Uneven sets (infinite)</h2>
			<Slider {...settings}>
				{/* <div>
					<Card key={`card-${group?.id}`}>
						<a href={`/${group?.id}`}>
							<Card.Img variant="top" src={`${group?.imgURL}`} />
							<Card.Body>
								<Card.Title>{group?.name}</Card.Title>
								<Card.Text>
									<span>{group?.description}</span>
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">{`${group?.count} Members`}</small>
							</Card.Footer>
						</a>
					</Card>
				</div> */}
				<div>
					<Card key={`card-${group?.id}`}>
						<a href={`/${group?.id}`}>
							<Card.Img variant="top" src={`${group?.imgURL}`} />
							<Card.Body>
								<Card.Title>{group?.name}</Card.Title>
								<Card.Text>
									<span>{group?.description}</span>
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">{`${group?.count} Members`}</small>
							</Card.Footer>
						</a>
					</Card>
				</div>
				<div>
					<Card key={`card-${group?.id}`}>
						<a href={`/${group?.id}`}>
							<Card.Img variant="top" src={`${group?.imgURL}`} />
							<Card.Body>
								<Card.Title>{group?.name}</Card.Title>
								<Card.Text>
									<span>{group?.description}</span>
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">{`${group?.count} Members`}</small>
							</Card.Footer>
						</a>
					</Card>
				</div>
				<div>
					<h3>3</h3>
				</div>
				<div>
					<h3>4</h3>
				</div>
				<div>
					<h3>5</h3>
				</div>
				<div>
					<h3>6</h3>
				</div>
			</Slider>
		</div>
	);
}

export default DeckCarousel;
