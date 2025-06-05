const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");

const {getPersonals, getPersonal, getNutritionists, getNutritionist} = require("../controllers/MaketplaceController");

const router = express.Router();

router.use(authMiddleware);

router.get("/personal", getPersonals);
router.get("/personal/:id", getPersonal);
router.get("/nutricionist", getNutritionists);
router.get("/nutricionist/:id", getNutritionist);


module.exports = router     