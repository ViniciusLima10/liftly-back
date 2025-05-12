const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require('../controllers/classController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClassById);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

module.exports = router;
