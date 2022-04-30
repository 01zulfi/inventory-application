const async = require('async');
const Country = require('../models/country');
const Continent = require('../models/continent');
const Grouping = require('../models/grouping');

const index = (req, res, next) => {
  async.parallel(
    {
      countryCount: (cb) => {
        Country.countDocuments({}, cb);
      },
      continentCount: (cb) => {
        Continent.countDocuments({}, cb);
      },
      groupingCount: (cb) => {
        Grouping.countDocuments({}, cb);
      },
    },
    (err, result) => {
      if (err) return next(err);
      return res.render('index', {
        title: 'Countries of the World',
        data: result,
      });
    },
  );
};

module.exports = index;
