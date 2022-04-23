const mongoose = require('mongoose');

const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: { type: String },
  capital: { type: String },
  population: { type: String },
  nationalLanguage: [{ type: String }],
  continents: [{ type: Schema.ObjectId, ref: 'Continent' }],
  groupings: [{ type: Schema.ObjectId, ref: 'Grouping' }],
});

CountrySchema.virtual('url').get(() => `/country/${this._id}`);

module.exports = mongoose.model('Country', CountrySchema);
