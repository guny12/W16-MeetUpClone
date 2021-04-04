const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User, EventAttendee, EventComment } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
// const { Op, UUID } = require("sequelize");
const eventIdRouter = express.Router();

eventIdRouter.patch(
	"/",
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
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const currentId = req.user.id;
		const { id } = req.body;
		// console.log(id, "ID----------------------------------------");
		const targetEvent = await Event.findByPk(id);
		console.log(targetEvent.id, "TARGET EVENT---------------------------------------");
		if (targetEvent.hostId === currentId) {
			const targetUserJoinEvents = await EventAttendee.findAll({ where: { eventId: targetEvent.id } });
			for (userJoinEvent of targetUserJoinEvents) {
				await userJoinEvent.destroy();
			}

			const targetEventcomments = await EventComment.findAll();
			console.log(targetEventcomments, "EVENT COMMENTs---------------------");
			for (eventcomment of targetEventcomments) await eventcomment.destroy();
			await targetEvent.destroy();
		}
		return res.json({ id });
	})
);

eventIdRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const adminId = req.user.id;
		const { name, description, isPublic, imgURL } = req.body;
		const newGroup = await Event.create({ adminId, name, description, isPublic, imgURL });
		await UserGroupJoin.create({ userId: adminId, groupId: newGroup.id });
		return res.json({ newGroup });
	})
);

module.exports = eventIdRouter;
