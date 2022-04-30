const { body, validationResult } = require('express-validator');
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

const continentCreateGet = (req, res, next) => {
  res.render('continent-form', {
    title: 'Create Continent',
  });
};

const continentCreatePost = [
  body('name').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const continent = new Continent({ name: req.body.name });

    if (!errors.isEmpty()) {
      return res.render('continent-form', {
        title: 'Create Continent',
        name: continent.name,
      });
    }

    return Continent.findOne({ name: continent.name }).exec((err, result) => {
      if (err) return next(err);
      if (result) return res.redirect(result.url);
      return continent.save((error) => {
        if (error) return next(err);
        return res.redirect(continent.url);
      });
    });
  },
];

const continentController = {
  continentsList,
  continentDetail,
  continentCreateGet,
  continentCreatePost,
};

module.exports = continentController;
