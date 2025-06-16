const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");

const {getPersonals, getPersonal, getNutritionists, getNutritionist, createService, deleteService, getServiceByProviderId} = require("../controllers/MaketplaceController");

const router = express.Router();

router.use(authMiddleware);

router.post("/:providerId", createService);
router.delete("/:id", createService);
router.get('/service/:providerId', getServiceByProviderId);


router.get("/personal", getPersonals);
router.get("/personal/:id", getPersonal);
router.get("/nutricionist", getNutritionists);
router.get("/nutricionist/:id", getNutritionist);


module.exports = router     