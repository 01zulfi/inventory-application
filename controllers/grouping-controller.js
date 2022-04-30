const { body, validationResult } = require('express-validator');
const async = require('async');
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

const groupingUpdateGet = (req, res, next) => {
  async.parallel(
    {
      grouping: (cb) => {
        Grouping.findById(req.params.id).exec(cb);
      },
      countries: (cb) => {
        Country.find({}).exec(cb);
      },
    },
    (err, result) => {
      if (err) return next(err);
      for (let i = 0; i < result.countries.length; i += 1) {
        if (result.grouping.countries.indexOf(result.countries[i]._id) > -1) {
          result.countries[i].checked = true;
        }
      }
      return res.render('grouping-form', {
        title: 'Update Grouping',
        name: result.grouping.name,
        shortName: result.grouping.shortName,
        description: result.grouping.description,
        countries: result.countries,
      });
    },
  );
};

const groupingUpdatePost = [
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
    grouping._id = req.params.id;

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
          title: 'Update Grouping',
          countries: result,
          name: grouping.name,
          shortName: grouping.shortName,
          description: grouping.description,
        });
      });
    } else {
      Grouping.findByIdAndUpdate(req.params.id, grouping, {}, (err, result) => {
        if (err) return next(err);
        return res.redirect(result.url);
      });
    }
  },
];

const groupingDeleteGet = (req, res, next) => {
  Grouping.findById(req.params.id).exec((err, result) => {
    if (err) return next(err);
    return res.render('grouping-delete', {
      title: 'Delete Grouping',
      grouping: result,
    });
  });
};

const groupingDeletePost = (req, res, next) => {
  Grouping.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    return res.redirect('/groupings');
  });
};

const groupingController = {
  groupingsList,
  groupingDetail,
  groupingCreateGet,
  groupingCreatePost,
  groupingUpdateGet,
  groupingUpdatePost,
  groupingDeleteGet,
  groupingDeletePost,
};

module.exports = groupingController;
