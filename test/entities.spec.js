const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const api = require('../dist/bundle');
const Ddf = api.Ddf;
const BackendFileReader = api.BackendFileReader;

/* eslint-disable camelcase */

const backendFileReader = new BackendFileReader();
const GLOBALIS_PATH = './test/fixtures/systema_globalis';

chai.use(sinonChai);

describe('when entities checking', () => {
  it('plain query should be processed correctly', done => {
    const ddf = new Ddf(GLOBALIS_PATH, backendFileReader);
    const request = {
      from: 'entities',
      animatable: 'time',
      select: {
        key: ['geo'],
        value: ['geo.name', '_default', 'geo.world_4region']
      },
      where: {'geo.is--country': true},
      grouping: {},
      orderBy: null
    };

    ddf.ddfRequest(request, (err, data) => {
      const EXPECTED_RECORDS_COUNT = 275;

      expect(!!err).to.be.false;
      expect(data.length).to.equal(EXPECTED_RECORDS_COUNT);

      /*
       data.forEach(record => {
       expect(record.geo).to.equal(record.country);
       });
       */

      done();
    });
  });

  it('shapes query should be processed correctly', done => {
    const ddf = new Ddf(GLOBALIS_PATH, backendFileReader);
    const request = {
      from: 'entities',
      animatable: false,
      select: {key: ['geo'], value: ['name', 'shape_lores_svg']},
      where: {'geo.is--world_4region': true},
      grouping: {},
      orderBy: null
    };

    ddf.ddfRequest(request, (err, data) => {
      const EXPECTED_RECORDS_COUNT = 4;

      expect(!!err).to.be.false;
      expect(data.length).to.equal(EXPECTED_RECORDS_COUNT);

      done();
    });
  });

  it('tags query should be processed correctly', done => {
    const ddf = new Ddf(GLOBALIS_PATH, backendFileReader);
    const request = {
      from: 'entities',
      animatable: false,
      select: {key: ['tag'], value: ['name', 'parent']},
      where: {},
      grouping: {},
      orderBy: null
    };

    ddf.ddfRequest(request, (err, data) => {
      const EXPECTED_RECORDS_COUNT = 84;

      expect(!!err).to.be.false;
      expect(data.length).to.equal(EXPECTED_RECORDS_COUNT);

      done();
    });
  });

  it('schema query should be processed correctly', done => {
    const ddf = new Ddf(GLOBALIS_PATH, backendFileReader);
    const request = {
      from: 'entitiesSchema',
      select: {
        key: ['geo', 'country'],
        value: []
      },
      where: {},
      grouping: {},
      orderBy: null
    };

    ddf.ddfRequest(request, (err, data) => {
      const EXPECTED_RECORDS_COUNT = 1;

      expect(!!err).to.be.false;
      expect(data.length).to.equal(EXPECTED_RECORDS_COUNT);

      done();
    });
  });
});
