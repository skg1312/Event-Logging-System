const express = require('express');
const crypto = require('crypto');
const Joi = require('joi');
const Log = require('../models/Log');

const router = express.Router();

// Schema validation
const logSchema = Joi.object({
  eventType: Joi.string().required(),
  sourceAppId: Joi.string().required(),
  dataPayload: Joi.object().required(),
});

// POST /logs - Add a new log
router.post('/', async (req, res) => {
  try {
    const { error } = logSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { eventType, sourceAppId, dataPayload } = req.body;

    // Retrieve the latest log for hash chaining
    const lastLog = await Log.findOne().sort({ timestamp: -1 });
    const previousHash = lastLog ? lastLog.currentHash : 'GENESIS_HASH';

    // Generate the current hash
    const currentHash = crypto
      .createHash('sha256')
      .update(previousHash + JSON.stringify({ eventType, sourceAppId, dataPayload }))
      .digest('hex');

    const newLog = new Log({
      eventType,
      sourceAppId,
      dataPayload,
      previousHash,
      currentHash,
    });

    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /logs - Fetch logs with filters
router.get('/', async (req, res) => {
  try {
    const { eventType, sourceAppId, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = {};

    if (eventType) query.eventType = eventType;
    if (sourceAppId) query.sourceAppId = sourceAppId;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const logs = await Log.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
