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

const groupingController = { groupingsList, groupingDetail, groupingCreateGet };

module.exports = groupingController;
