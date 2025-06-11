// src/controllers/subscriptionController.js
'use strict';

const { Subscription, User, Plan, Payment } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { userId, planId, startDate, endDate, autoRenew } = req.body;
      const subscription = await Subscription.create({
        userId,
        planId,
        startDate,
        endDate,
        autoRenew
      });
      return res.status(201).json(subscription);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const subscriptions = await Subscription.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Plan, as: 'plan', attributes: ['id', 'name', 'price', 'durationInDays'] }
        ]
      });
      return res.json(subscriptions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const subscription = await Subscription.findByPk(id, {
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Plan, as: 'plan', attributes: ['id', 'name', 'price', 'durationInDays'] },
          { model: Payment, as: 'payments' }
        ]
      });
      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }
      return res.json(subscription);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { startDate, endDate, status, autoRenew } = req.body;
      const [updated] = await Subscription.update(
        { startDate, endDate, status, autoRenew },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Subscription not found' });
      }
      const updatedSubscription = await Subscription.findByPk(id);
      return res.json(updatedSubscription);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Subscription.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Subscription not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
