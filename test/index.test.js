/* eslint no-unused-expressions:0 */

var getJiraIssuesJQL = require('../lib/index.js');
var request = require('request');
var expect = require('chai').expect;
var sinon = require('sinon');

var testVars = require('./testVars.js');

describe('jira api wrapper testing', function() {
  before(function(done) {
    var stub = sinon.stub(request, 'get');
    stub.withArgs(testVars.issuesOptions).yields(null, { statusCode: '200' }, testVars.issuesOutput);
    done();
  });

  after(function(done) {
    request.get.restore();
    done();
  });

  it('api should exist', function() {
    expect(getJiraIssuesJQL).to.exist;
  });

  it('getIssuesJQL with no jql should return error', function(done) {
    getJiraIssuesJQL(null, function(err, res) {
      expect(err).to.equal('NO JQL PROVIDED');
      expect(res).to.be.undefined;
      done();
    });
  });

  it('getIssuesJQL with jql should return a stream', function(done) {
    getJiraIssuesJQL('', function(err, res) {
      if (err) return done(err);
      expect(res).to.be.an('object');
      expect(res.__HighlandStream__).to.be.true;
      var dataCounter = 0;
      res.on('data', function(data) {
        data.to.equal(testVars.issuesOutput.issues[dataCounter]);
        dataCounter++;
      });
      done();
    });
  });
});
