const { body, validationResult } = require('express-validator');
const Grouping = require('../models/grouping');
const Country = require('../models/country');

const groupingsList = (req, res, next) => {
  Grouping.find({}).exec((err, result) => {
    if (err) return next(err);
    return res.render('groupings-list', {
      title: 'Groupings',
      groupingsList: result,
    });
  });
};

const groupingDetail = (req, res, next) => {
  Grouping.findById(req.params.id)
    .populate('countries')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('grouping-detail', {
        title: result.name,
        grouping: result,
      });
    });
};

const groupingCreateGet = (req, res, next) => {
  Country.find({}).exec((err, result) => {
    if (err) return next(err);
    return res.render('grouping-form', {
      title: 'Create a Grouping',
      countries: result,
    });
  });
};

const groupingCreatePost = [
  body('name').trim().escape(),
  body('shortName').trim().escape(),
  body('description').trim().escape(),
  body('country.*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const grouping = new Grouping({
      name: req.body.name,
      shortName: req.body.shortName,
      description: req.body.description,
      countries: req.body.country,
    });

    if (!errors.isEmpty()) {
      Country.find({}).exec((err, result) => {
        if (err) return next(err);
        for (let i = 0; i < result.length; i += 1) {
          if (grouping.countries.indexOf(result[i]._id) > -1) {
            /* eslint-disable no-param-reassign */
            result[i].checked = true;
          }
        }
        return res.render('grouping-form', {
          title: 'Create a Grouping',
          countries: result,
          name: grouping.name,
          shortName: grouping.shortName,
          description: grouping.description,
        });
      });
    }

    Grouping.findOne({ name: grouping.name }).exec((err, result) => {
      if (err) return next(err);
      if (result) return res.redirect(result.url);
      return grouping.save((error) => {
        if (error) return next(error);
        return res.redirect(grouping.url);
      });
    });
  },
];

const groupingController = {
  groupingsList,
  groupingDetail,
  groupingCreateGet,
  groupingCreatePost,
};

module.exports = groupingController;
