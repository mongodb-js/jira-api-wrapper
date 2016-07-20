/* eslint no-unused-expressions:0 */

var jiraApiWrapper = require('../lib/index.js');
var request = require('request');
var expect = require('chai').expect;
var sinon = require('sinon');

var testVars = require('./testVars.js');

describe('jira api wrapper', function() {
  describe('unit testing', function() {
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
      expect(jiraApiWrapper).to.exist;
    });

    it('method should exist', function() {
      expect(jiraApiWrapper.getJiraIssuesJQL).to.exist;
    });

    it('getIssuesJQL with no jql should return error', function(done) {
      jiraApiWrapper.getJiraIssuesJQL(null, function(err, res) {
        expect(err).to.equal('NO JQL PROVIDED');
        expect(res).to.be.undefined;
        done();
      });
    });

    it('getIssuesJQL with jql should return a stream', function(done) {
      jiraApiWrapper.getJiraIssuesJQL('', function(err, res) {
        if (err) return done(err);
        expect(res).to.be.an('object');
        expect(res.__HighlandStream__).to.be.true;
        var dataCounter = 0;
        res.on('data', function(data) {
          expect(data).to.equal(testVars.issuesOutput.issues[dataCounter]);
          dataCounter++;
        });
        res.on('end', function() {
          done();
        });
      });
    });
  });

  describe('functional testing', function() {
    it('getIssuesJQL with jql should return a stream', function(done) {
      var jql = 'project="NODE"'
          + '&issuetype=Epic'
          + '&status=Closed';

      jiraApiWrapper.getJiraIssuesJQL(jql, function(err, res) {
        if (err) return done(err);
        expect(res).to.be.an('object');
        expect(res.__HighlandStream__).to.be.true;
        res.on('data', function(data) {
          expect(data).to.include.keys('id', 'self', 'key', 'fields');
          expect(data.key).to.contain('NODE-');
          expect(data.fields.issuetype.name).to.equal('Epic');
        });
        res.on('end', function() {
          done();
        });
      });
    });
  });
});
