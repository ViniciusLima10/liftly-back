const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createGym,
  getGyms,
  getGymById,
  updateGym,
  deleteGym,
  loginGym,
} = require('../controllers/gymController');

const router = express.Router();

router.post('/', createGym);
router.post('/login', loginGym);

router.use(authMiddleware);

router.get('/', getGyms);
router.get('/:id', getGymById);
router.put('/:id', updateGym);
router.delete('/:id', deleteGym);

module.exports = router;
