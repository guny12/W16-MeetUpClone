const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupRouter = require("./group.js");

const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User, UserGroupJoin } = require("../../db/models");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { Op, UUID } = require("sequelize");

router.use("/session", sessionRouter);
router.use("/groups", groupRouter);
router.use("/users", usersRouter);

router.patch(
	"/:groupid",
	requireAuth,
	asyncHandler(async (req, res) => {
		const adminId = req.user.id;
		const { id, name, description, isPublic, imgURL } = req.body;
		await Group.update({ name, description, isPublic, imgURL }, { where: { id, adminId } });
		return res.json({ id });
	})
);

module.exports = router;

// const { restoreUser } = require("../../utils/auth.js");
// const asyncHandler = require("express-async-handler");
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");

// router.get(
// 	"/set-token-cookie",
// 	asyncHandler(async (req, res) => {
// 		const user = await User.findOne({
// 			where: {
// 				username: "Demo-lition",
// 			},
// 		});
// 		setTokenCookie(res, user);
// 		return res.json({ user });
// 	})
// );

// GET /api/restore-user
// router.get("/restore-user", restoreUser, (req, res) => {
// 	return res.json(req.user);
// });

// GET /api/require-auth
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
// 	return res.json(req.user);
// });

// testing route
// router.post("/test", function (req, res) {
// 	res.json({ requestBody: req.body });
// });
