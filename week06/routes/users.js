const express = require("express");
const router = express.Router();
const users = require("../controllers/usersController");

router.get("/", users.getAll);
router.get("/:userId", users.getOne);
router.post("/", users.create);
router.patch("/:userId", users.update);
router.delete("/:userId", users.remove);

module.exports = router;
