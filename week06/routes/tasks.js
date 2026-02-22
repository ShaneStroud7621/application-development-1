const express = require("express");
const router = express.Router();
const tasks = require("../controllers/tasksController");

router.get("/", tasks.getAll);
router.get("/:taskId", tasks.getOne);
router.post("/", tasks.create);
router.patch("/:taskId", tasks.update);
router.delete("/:taskId", tasks.remove);

module.exports = router;
