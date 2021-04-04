import React, { Component } from "react";
import "./VerticalCarousel.css";
import Slider from "react-slick";
import { Card } from "react-bootstrap";

function VerticalCarousel({ events, whatGroup }) {
	// let { publicGroups, privateGroups } = groups;
	// let targetGroups = isPrivate ? privateGroups : publicGroups;

	let { JoinedPublicEvents } = events;
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		swipeToSlide: true,
	};

	console.log("THIS HAPPENEd---------------------------");
	let cards = Object.values(JoinedPublicEvents).map((event) => (
		<div>
			<Card key={`card-${event.id}`} className="bg-dark text-white">
				<a href={`/${event.id}`}>
					<Card.Img src={`${event.imgURL}`} alt="Card image" />
					<Card.ImgOverlay>
						<Card.Title
							style={{
								color: "white",
								fontSize: "larger",
								backgroundColor: "rgba(7, 7, 7, 0.4)",
								borderRadius: "5px",
							}}
						>
							{event.name}
						</Card.Title>
						<Card.Text>
							<span
								style={{
									borderRadius: "5px",
									color: "white",
									fontSize: "larger",
									backgroundColor: "rgba(7, 7, 7, 0.4)",
								}}
							>
								{`${event.count} Members`}
							</span>
						</Card.Text>
					</Card.ImgOverlay>
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

export default VerticalCarousel;
