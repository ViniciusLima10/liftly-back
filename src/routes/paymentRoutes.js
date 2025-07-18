'use strict';

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  create,
  index: getPayments,
  show: getPaymentById,
  update,
  destroy: deletePayment
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/', getPayments);
router.get('/:id', getPaymentById);

router.use(authMiddleware);

router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deletePayment);

module.exports = router;