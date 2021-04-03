const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User, UserGroupJoin } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
// const { Op, UUID } = require("sequelize");
const groupIdRouter = express.Router();

// const validateUpdateGroup = [
// 	check("description")
// 		.exists({ checkFalsy: true })
// 		.isLength({ min: 1 })
// 		.withMessage("Please provide a description with at least 1 character.")
// 		.isLength({ max: 255 })
// 		.withMessage("Please provide a description with less than 255 characters."),
// 	check("name")
// 		.exists({ checkFalsy: true })
// 		.isLength({ min: 1 })
// 		.withMessage("Please provide a Name with at least 1 character.")
// 		.isLength({ max: 50 })
// 		.withMessage("Please provide a Name with less than 50 characters."),

// 	handleValidationErrors,
// ];

groupIdRouter.patch(
	"/",
	requireAuth,
	// validateUpdateGroup,
	// validationResult,
	asyncHandler(async (req, res) => {
		const adminId = req.user.id;
		const { id, name, description, isPublic, imgURL } = req.body;
		await Group.update({ name, description, isPublic, imgURL }, { where: { id, adminId } });
		return res.json({ id });
	})
);

groupIdRouter.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const currentId = req.user.id;
		const { id } = req.body;
		const targetGroup = await Group.findByPk(id);
		if (targetGroup.adminId === currentId) {
			const targetUserJoinGroups = await UserGroupJoin.findAll({ where: { groupId: targetGroup.id } });
			for (userGroupJoin of targetUserJoinGroups) await userGroupJoin.destroy();
			await targetGroup.destroy();
		}
		return res.json({ id });
	})
);

groupIdRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const adminId = req.user.id;
		const { name, description, isPublic, imgURL } = req.body;
		const newGroup = await Group.create({ adminId, name, description, isPublic, imgURL });
		await UserGroupJoin.create({ userId: adminId, groupId: newGroup.id });
		return res.json({ newGroup });
	})
);

module.exports = groupIdRouter;
