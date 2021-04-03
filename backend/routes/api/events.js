const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, EventComment, User, EventAttendee } = require("../../db/models");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const eventsRouter = express.Router();

// route to get events
eventsRouter.get(
	"/",
	restoreUser,
	asyncHandler(async (req, res) => {
		// send the userId in req, to pull out the groups that they are a part of.
		if (req.user) var attendeeId = req.user.id;

		console.log(attendeeId, "ATTENDEEID--------------------------------------------");
		let joinedPublicEvents = [],
			joinedEventIds = [];

		// if there's a user logged in, this will get all the currently joined Events

		if (attendeeId) {
			joinedPublicEvents = await Event.findAll({
				include: [
					{
						model: User,
						where: { id: attendeeId },
						attributes: [],
					},
				],
				order: [["id", "ASC"]],
			});

			for (currEvent of joinedPublicEvents) {
				currEvent.dataValues["count"] = await EventAttendee.count({ where: { eventId: currEvent.dataValues.id } });
				let owner = await User.findOne({ where: { id: currEvent.dataValues.hostId }, attributes: ["firstName"] });
				currEvent.dataValues["hostName"] = owner.firstName;
				joinedEventIds.push(currEvent.dataValues.id);
			}
		}
		// after this, it grabs all the unjoined events.
		// this grabs any unjoined events, for logged in/out users.

		// let newPublicGroups = await Event.findAll({
		// 	where: { id: { [Op.notIn]: joinedEventIds } },
		// 	order: [["id", "ASC"]],
		// });

		// for (currEvent of newPublicGroups) {
		// 	currEvent.dataValues["count"] = await EventAttendee.count({ where: { eventId: currEvent.dataValues.id } });
		// 	let owner = await User.findOne({ where: { id: currEvent.dataValues.hostId }, attributes: ["firstName"] });
		// 	currEvent.dataValues["hostName"] = owner.firstName;
		// }

		// let newPrivateGroups = await Event.findAll({
		// 	where: { id: { [Op.notIn]: joinedEventIds } },
		// 	order: [["id", "ASC"]],
		// });

		// for (currEvent of newPrivateGroups) {
		// 	currEvent.dataValues["count"] = await EventAttendee.count({ where: { eventId: currEvent.dataValues.id } });
		// 	let owner = await User.findOne({ where: { id: currEvent.dataValues.hostId }, attributes: ["firstName"] });
		// 	currEvent.dataValues["hostName"] = owner.firstName;
		// }
		console.log(joinedPublicEvents, "PUBLIC EVENTS------------------");
		return res.json({ joinedPublicEvents });
	})
);

// route to set EventAttendee Join table so user joins Event
eventsRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const attendeeId = req.user.id;
		const { id } = req.body.event;
		const alreadyJoined = await EventAttendee.count({ where: { attendeeId, eventId: id } });
		if (!alreadyJoined) await EventAttendee.create({ attendeeId, eventId: id });

		return res.json({ id });
	})
);

module.exports = eventsRouter;
