const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createGym,
  getGyms,
  getGymById,
  updateGym,
  deleteGym,
} = require('../controllers/gymController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createGym);
router.get('/', getGyms);
router.get('/:id', getGymById);
router.put('/:id', updateGym);
router.delete('/:id', deleteGym);

module.exports = router;
