var request = require('request');
var _ = require('highland');

var URL = 'https://jira.mongodb.org/rest/api/2';
var auth = {
  user: process.env.JIRA_USER,
  pass: process.env.JIRA_PASS
};

/**
 * Function to perform a get request with given uri and options, handles pagination recursively and writes all results to the same stream
 * @param {stream} stream Stream to write data to
 * @param {object} options Options object for the HTTP request
 * @param {function} callback Callback function to call if error or successful return
 * @return {void}
 */
var getData = function(stream, options, callback) {
  var stream = stream || _(); // eslint-disable-line no-redeclare

  console.log('fetching..' + options.uri);

  request.get(options, function(error, response, body) {
    if (error || body.errors) {
      callback(error || body.errors);
      return;
    }

    if (response.statusCode === 200) {
      if (body.issues.length > 0) {
        // console.log(body);
        stream.write(body.issues);

        if ((+body.startAt + +body.maxResults) <= +body.total) {
          var nextOptions = options;
          nextOptions.qs.startAt = +body.startAt + +body.maxResults;
          nextOptions.qs.maxResults = +body.maxResults;
          getData(stream, nextOptions, callback);
        } else {
          stream.end();
          callback(null, stream);
          return;
        }
      }
    }
  });
  // return callback(null, stream);
};

var searchJQL = function(jql, callback) {
  var options = {
    uri: URL + '/search',
    auth: auth,
    json: true
  };

  options.qs = {
    'jql': jql,
    'startAt': 0,
    'maxResults': 50
  };

  getData(null, options, function(err, res) {
    if (err) {
      callback(err);
      return;
    }

    // res.on('data', function(data) {
    //   console.log(data);
    // });
    // res.on('end', function() {
    //   console.log('FETCHED JQL SEARCH');
    // });
    callback(null, res);
    return;
  });
};

searchJQL('project="INT"&issuetype=Bug&component=Compass&labels=bugsnag-error', function(err, res) {
  if (err) {
    console.error(err);
    return;
  }

  res.on('data', function(data) {
    console.log(data);
  });
  res.on('end', function() {
    console.log('FETCHED JQL SEARCH');
  });
});

/**
 *
 * @api public
 */
module.exports = {
  searchJQL: searchJQL
};
