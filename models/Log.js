const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  previousHash: { type: String },
  currentHash: { type: String, required: true },
});

logSchema.index({ timestamp: 1 });
logSchema.index({ eventType: 1 });
logSchema.index({ sourceAppId: 1 });

module.exports = mongoose.model('Log', logSchema);
