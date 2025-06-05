const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {createPlan } = require("../controllers/PersonalServiceController")

const router = express.Router();

router.use(authMiddleware);

router.post('/', createPlan)

module.exports = router