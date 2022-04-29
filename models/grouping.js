const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupingSchema = new Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String },
  countries: [{ type: Schema.ObjectId, ref: 'Country', required: true }],
});

GroupingSchema.virtual('url').get(function getGroupingUrl() {
  return `/grouping/${this._id}`;
});

module.exports = mongoose.model('Grouping', GroupingSchema);
