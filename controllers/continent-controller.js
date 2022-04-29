const Continent = require('../models/continent');
require('../models/country');

const continentsList = (req, res, next) => {
  Continent.find({}).exec((err, result) => {
    if (err) return next(err);
    return res.render('continents-list', {
      title: 'Continents',
      continentsList: result,
    });
  });
};

const continentDetail = (req, res, next) => {
  Continent.findById(req.params.id)
    .populate('countries')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('continent-detail', {
        title: result.name,
        continent: result,
      });
    });
};

const continentController = { continentsList, continentDetail };

module.exports = continentController;
