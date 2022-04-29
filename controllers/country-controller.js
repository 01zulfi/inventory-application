const Country = require('../models/country');
require('../models/continent');
require('../models/grouping');

const countriesList = (req, res, next) => {
  Country.find({})
    .populate('continents')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('countries-list', {
        title: 'Countries',
        countriesList: result,
      });
    });
};

const countryDetail = (req, res, next) => {
  Country.findById(req.params.id)
    .populate('continents')
    .populate('groupings')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('country-detail', {
        title: result.name,
        country: result,
      });
    });
};

const countryController = { countriesList, countryDetail };

module.exports = countryController;
