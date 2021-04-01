import React, { Component } from "react";
import "./Carousel.css";
import GroupTiles from "../GroupTilesComponent";
import Slider from "react-slick";
import { Card, CardDeck } from "react-bootstrap";

function VerticalCarousel({ groups, isPrivate }) {
	let { publicGroups, privateGroups } = groups;
	let targetGroups = isPrivate ? privateGroups : publicGroups;

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		swipeToSlide: true,
	};

	let cards = Object.values(targetGroups).map((group) => (
		<div>
			<Card key={`card-${group.id}`} className="bg-dark text-white">
				<a href={`/${group.id}`}>
					<Card.Img src={`${group.imgURL}`} alt="Card image" />
					<Card.ImgOverlay>
						<Card.Title
							style={{
								color: "white",
								fontSize: "larger",
								backgroundColor: "rgba(7, 7, 7, 0.4)",
								borderRadius: "5px",
							}}
						>
							{group.name}
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
								{`${group.count} Members`}
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
