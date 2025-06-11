'use strict';

const { Plan } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { name, description, price, durationInDays } = req.body;
      const plan = await Plan.create({ name, description, price, durationInDays });
      return res.status(201).json(plan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const plans = await Plan.findAll();
      return res.json(plans);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const plan = await Plan.findByPk(id);
      if (!plan) return res.status(404).json({ error: 'Plan not found' });
      return res.json(plan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, durationInDays } = req.body;
      const [updated] = await Plan.update(
        { name, description, price, durationInDays },
        { where: { id } }
      );
      if (!updated) return res.status(404).json({ error: 'Plan not found' });
      const updatedPlan = await Plan.findByPk(id);
      return res.json(updatedPlan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Plan.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ error: 'Plan not found' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
