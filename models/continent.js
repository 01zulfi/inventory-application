const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContinentSchema = new Schema({
  name: { type: String },
  countries: [{ type: Schema.ObjectId, ref: 'Country' }],
});

ContinentSchema.virtual('url').get(() => `/continent/${this._id}`);

module.exports = mongoose.model('Continent', ContinentSchema);
