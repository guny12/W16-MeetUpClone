import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./GroupTilesComponent.css";
import { Card, CardDeck } from "react-bootstrap";

const GroupTiles = ({ groups }) => {
	let { publicGroups } = groups;

	let cards = Object.values(publicGroups).map((group) => {
		return (
			<Card key={`card-${group.id}`}>
				<a href={`/${group.id}`}>
					<Card.Img variant="top" src={`${group.imgURL}`} />
					<Card.Body>
						<Card.Title>{group.name}</Card.Title>
						<Card.Text>{group.description}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">{`${group.count} Members`}</small>
					</Card.Footer>
				</a>
			</Card>
		);
	});

	return (
		<CardDeck>
			{cards}
			{cards}
			{cards}
		</CardDeck>
	);
};

export default GroupTiles;
