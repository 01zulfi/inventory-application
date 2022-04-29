#! /usr/bin/env node

// Get arguments passed on command line

const userArgs = process.argv.slice(2);

const async = require('async');
const mongoose = require('mongoose');
const Country = require('./models/country');
const Continent = require('./models/continent');
const Grouping = require('./models/grouping');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const countries = [];
const continents = [];
const groupings = [];

const countryCreate = (countryDetail, cb) => {
  const country = new Country(countryDetail);

  country.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Country: ${country}`);
    countries.push(country);
    cb(null, country);
  });
};

const continentCreate = (continentDetail, continentId, cb) => {
  const continent = new Continent(continentDetail);
  continent._id = continentId;

  continent.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Continent: ${continent}`);
    continents.push(continent);
    cb(null, continent);
  });
};

const groupingCreate = (groupingDetail, cb) => {
  const grouping = new Grouping(groupingDetail);

  grouping.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Grouping: ${grouping}`);
    groupings.push(grouping);
    cb(null, grouping);
  });
};

const asiaId = new mongoose.Types.ObjectId().toHexString();
const europeId = new mongoose.Types.ObjectId().toHexString();
const africaId = new mongoose.Types.ObjectId().toHexString();
const australiaId = new mongoose.Types.ObjectId().toHexString();
const antarcticaId = new mongoose.Types.ObjectId().toHexString();
const southAmericaId = new mongoose.Types.ObjectId().toHexString();

const createCountries = (cb) => {
  async.parallel(
    [
      (callback) => {
        countryCreate(
          {
            name: 'Brazil',
            capital: 'Brasilia',
            population: '212.6 million',
            nationalLanguage: ['Portuguese'],
            continents: [southAmericaId],
          },
          callback,
        );
      },
      (callback) => {
        countryCreate(
          {
            name: 'Japan',
            capital: 'Tokyo',
            population: '125.8 million',
            nationalLanguage: ['Japanese'],
            continents: [asiaId],
          },
          callback,
        );
      },
      (callback) => {
        countryCreate(
          {
            name: 'India',
            capital: 'New Delhi',
            population: '1.38 billion',
            nationalLanguage: ['Hindi', 'English'],
            continents: [asiaId],
          },
          callback,
        );
      },
      (callback) => {
        countryCreate(
          {
            name: 'Germany',
            capital: 'Berlin',
            population: '83.24 million',
            nationalLanguage: ['German'],
            continents: [europeId],
          },
          callback,
        );
      },
      (callback) => {
        countryCreate(
          {
            name: 'New Zealand',
            capital: 'Wellington',
            population: '5.08 million',
            nationalLanguage: ['Maori', 'New Zealand Sign Language', 'English'],
            continents: [australiaId],
          },
          callback,
        );
      },
      (callback) => {
        countryCreate(
          {
            name: 'Namibia',
            capital: 'Windhoek',
            population: '2.45 million',
            nationalLanguage: ['English'],
            continents: [africaId],
          },
          callback,
        );
      },
      (callback) => {
        countryCreate(
          {
            name: 'France',
            capital: 'Paris',
            population: '67.39 million',
            nationalLanguage: ['French'],
            continents: [europeId],
          },
          callback,
        );
      },
      (callback) => {
        countryCreate(
          {
            name: 'Spain',
            capital: 'Madrid',
            population: '47.35 million',
            nationalLanguage: ['Spanish'],
            continents: [europeId],
          },
          callback,
        );
      },
    ],
    // optional callback
    cb,
  );
};

const createContinents = (cb) => {
  async.parallel(
    [
      (callback) => {
        continentCreate(
          {
            name: 'Asia',
            countries: [countries[1], countries[2]],
          },
          asiaId,
          callback,
        );
      },
      (callback) => {
        continentCreate(
          {
            name: 'South America',
            countries: [countries[0]],
          },
          southAmericaId,
          callback,
        );
      },
      (callback) => {
        continentCreate(
          {
            name: 'Antarctica',
            countries: [],
          },
          antarcticaId,
          callback,
        );
      },
      (callback) => {
        continentCreate(
          {
            name: 'Europe',
            countries: [countries[3], countries[6], countries[7]],
          },
          europeId,
          callback,
        );
      },
    ],
    cb,
  );
};

const createGroupings = (cb) => {
  async.parallel(
    [
      (callback) => {
        groupingCreate(
          {
            name: 'G4 Nations',
            shortName: 'G4 Nations',
            description:
              "Support each other's bids for permanent seats on United Nations Security Council",
            countries: [countries[0], countries[1], countries[2], countries[3]],
          },
          callback,
        );
      },
      (callback) => {
        groupingCreate(
          {
            name: 'FRES',
            shortName: 'FRES',
            description: 'France and Spain',
            countries: [countries[6], countries[7]],
          },
          callback,
        );
      },
    ],
    cb,
  );
};

async.series(
  [createCountries, createContinents, createGroupings],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
      return;
    }
    console.log(results);
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
