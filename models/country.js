const mongoose = require('mongoose');

const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: { type: String, required: true },
  capital: { type: String, required: true },
  population: { type: String },
  nationalLanguage: [{ type: String, required: true }],
  continents: [{ type: Schema.ObjectId, ref: 'Continent', required: true }],
  groupings: [{ type: Schema.ObjectId, ref: 'Grouping' }],
});

CountrySchema.virtual('url').get(function getCountryUrl() {
  return `/country/${this._id}`;
});

module.exports = mongoose.model('Country', CountrySchema);
