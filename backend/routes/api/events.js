const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { sequelize, Sequelize, Group, Event, EventComment, User, EventAttendee } = require("../../db/models");
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

		let joinedUpcomingEvents = [],
			notJoinedUpcomingEvents = [],
			joinedEventIds = [],
			notJoinedGroupsIds = [];
		let currentDate = Sequelize.fn("now");

		// if there's a user logged in, this will get all the currently joined Eventsm adds the hostname and number of people currently in that event.
		if (attendeeId) {
			joinedUpcomingEvents = await Event.findAll({
				include: [
					{
						model: User,
						where: { id: attendeeId },
						attributes: [],
					},
				],
				where: { eventDate: { [Op.gte]: currentDate } },
				order: [["id", "ASC"]],
			});

			for (currEvent of joinedUpcomingEvents) {
				currEvent.dataValues["count"] = await EventAttendee.count({ where: { eventId: currEvent.dataValues.id } });
				let owner = await User.findOne({ where: { id: currEvent.dataValues.hostId }, attributes: ["firstName"] });
				currEvent.dataValues["hostName"] = owner.firstName;
				joinedEventIds.push(currEvent.dataValues.id);
			}

			// this grabs all groups that the user is part of. so we can check which events they haven't joined after.
			let joinedGroups = await Group.findAll({
				include: [
					{
						model: User,
						where: { id: attendeeId },
						attributes: [],
					},
				],
				order: [["id", "ASC"]],
			});

			let joinedGroupsIds = [];
			for (group of joinedGroups) {
				joinedGroupsIds.push(group.dataValues.id);
			}

			// after this, it grabs all the unjoined events of groups that user is currently a part of
			notJoinedUpcomingEvents = await Event.findAll({
				where: {
					[Op.and]: [
						{ eventDate: { [Op.gte]: currentDate } },
						{ groupId: { [Op.in]: joinedGroupsIds } },
						{ id: { [Op.notIn]: joinedEventIds } },
					],
				},
				order: [["id", "ASC"]],
			});

			for (currEvent of notJoinedUpcomingEvents) {
				currEvent.dataValues["count"] = await EventAttendee.count({ where: { eventId: currEvent.dataValues.id } });
				let owner = await User.findOne({ where: { id: currEvent.dataValues.hostId }, attributes: ["firstName"] });
				currEvent.dataValues["hostName"] = owner.firstName;
				notJoinedGroupsIds.push(currEvent.dataValues.id);
			}
		}

		// this grabs some unjoined events, for logged in/out users.

		let somePublicEvents = await Event.findAll({
			where: {
				[Op.and]: [
					{ eventDate: { [Op.gte]: currentDate } },
					{ id: { [Op.notIn]: [...joinedEventIds, ...notJoinedGroupsIds] } },
				],
			},
			order: [["id", "ASC"]],
		});

		for (currEvent of somePublicEvents) {
			currEvent.dataValues["count"] = await EventAttendee.count({ where: { eventId: currEvent.dataValues.id } });
			let owner = await User.findOne({ where: { id: currEvent.dataValues.hostId }, attributes: ["firstName"] });
			currEvent.dataValues["hostName"] = owner.firstName;
		}

		// let newPrivateGroups = await Event.findAll({
		// 	where: { id: { [Op.notIn]: joinedEventIds } },
		// 	order: [["id", "ASC"]],
		// });

		// for (currEvent of newPrivateGroups) {
		// 	currEvent.dataValues["count"] = await EventAttendee.count({ where: { eventId: currEvent.dataValues.id } });
		// 	let owner = await User.findOne({ where: { id: currEvent.dataValues.hostId }, attributes: ["firstName"] });
		// 	currEvent.dataValues["hostName"] = owner.firstName;
		// }

		return res.json({ joinedUpcomingEvents, notJoinedUpcomingEvents, somePublicEvents, joinedEventIds });
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
