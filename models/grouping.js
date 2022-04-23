const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupingSchema = new Schema({
  name: { type: String },
  shortName: { type: String },
  countries: [{ type: Schema.ObjectId, ref: 'Country' }],
});

GroupingSchema.virtual('url').get(() => `/grouping/${this._id}`);

module.exports = mongoose.model('Grouping', GroupingSchema);
