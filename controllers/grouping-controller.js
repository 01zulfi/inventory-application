const Grouping = require('../models/grouping');
require('../models/country');

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

const groupingController = { groupingsList, groupingDetail };

module.exports = groupingController;
