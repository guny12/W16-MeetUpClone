const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User, EventAttendee, EventComment } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
// const { Op, UUID } = require("sequelize");
const eventIdRouter = express.Router();

eventIdRouter.patch(
	`/`,
	requireAuth,
	asyncHandler(async (req, res) => {
		const hostId = req.user.id;
		const { name, id, description, imgURL, location, eventDate, eventType, availableSpots } = req.body;
		await Event.update(
			{ name, id, description, imgURL, location, eventDate, eventType, availableSpots },
			{ where: { id, hostId } }
		);
		let {
			dataValues: { groupId },
		} = await Event.findByPk(id);

		return res.json({ id, groupId });
	})
);

eventIdRouter.delete(
	`/`,
	requireAuth,
	asyncHandler(async (req, res) => {
		const currentId = req.user.id;
		const { id } = req.body;

		const targetEvent = await Event.findByPk(id);

		if (targetEvent.hostId === currentId) {
			const targetUserJoinEvents = await EventAttendee.findAll({ where: { eventId: targetEvent.id } });
			for (userJoinEvent of targetUserJoinEvents) await userJoinEvent.destroy();

			await targetEvent.destroy();
		}
		return res.json({ id });
	})
);

eventIdRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const hostId = req.user.id;
		const { name, id, description, imgURL, location, eventDate, eventType, availableSpots } = req.body;
		const newEvent = await Event.create({
			hostId,
			name,
			id,
			description,
			imgURL,
			location,
			eventDate,
			eventType,
			availableSpots,
		});
		await EventAttendee.create({ attendeeId: hostId, eventId: newEvent.id });
		return res.json({ newEvent });
	})
);

module.exports = eventIdRouter;
