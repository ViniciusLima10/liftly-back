// src/controllers/paymentController.js
'use strict';

const { Payment, Subscription } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { subscriptionId, amount, dueDate, method } = req.body;
      const payment = await Payment.create({
        subscriptionId,
        amount,
        dueDate,
        method
      });
      return res.status(201).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const payments = await Payment.findAll({
        include: [{ model: Subscription, as: 'subscription' }]
      });
      return res.json(payments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id, {
        include: [{ model: Subscription, as: 'subscription' }]
      });
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      return res.json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        amount,
        status,
        dueDate,
        paymentDate,
        method
      } = req.body;

      const [updated] = await Payment.update(
        { amount, status, dueDate, paymentDate, method },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      const updatedPayment = await Payment.findByPk(id, {
        include: [{ model: Subscription, as: 'subscription' }]
      });

      return res.json(updatedPayment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Payment.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
