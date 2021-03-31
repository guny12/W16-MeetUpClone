import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./GroupTilesComponent.css";
// import { Button, Form } from "react-bootstrap";

const GroupTiles = ({ groups }) => {
	let { publicGroups } = groups;

	return (
		<div className="groupTile__container">
			{Object.values(publicGroups).map((group) => {
				console.log(group, "INDIVIDUAL GROUP HERE ------------");
				return (
					<NavLink key={`NavLink${group.id}`} to={`/${group.id}`}>
						<img className="groupTile__image" src={`${group.imgURL}`}></img>
						<div>
							<div className="primary-text">{group.name}</div>
							<div className="secondary-text">
								{group.description} {group.createdAt}
							</div>
						</div>
					</NavLink>
				);
			})}
		</div>
	);
};

export default GroupTiles;
