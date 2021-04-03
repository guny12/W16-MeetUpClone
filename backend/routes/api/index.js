const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupRouter = require("./groups.js");
const groupIdRouter = require("./groupid.js");
const eventRouter = require("./events.js");

router.use("/users", usersRouter);
router.use("/session", sessionRouter);
router.use("/groups", groupRouter);
router.use("/events", eventRouter);
router.use("/:groupid", groupIdRouter);

module.exports = router;
