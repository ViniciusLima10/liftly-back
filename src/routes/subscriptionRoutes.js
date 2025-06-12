'use strict';

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  create,
  index: getSubscriptions,
  show: getSubscriptionById,
  update,
  destroy: deleteSubscription
} = require('../controllers/subscriptionController');

const router = express.Router();

router.get('/', getSubscriptions);
router.get('/:id', getSubscriptionById);

router.use(authMiddleware);

router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteSubscription);

module.exports = router;
