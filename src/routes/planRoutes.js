'use strict';

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  create,
  index: getPlans,
  show: getPlanById,
  update,
  destroy: deletePlan
} = require('../controllers/planController');

const router = express.Router();

router.get('/', getPlans);
router.get('/:id', getPlanById);

router.use(authMiddleware);

router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deletePlan);

module.exports = router;