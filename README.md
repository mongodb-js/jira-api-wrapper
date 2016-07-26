# jira-api-wrapper [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url]

> Light wrapper to access JIRA API and abstract out api-specific methods

## Install

```
npm install mongodb-js-jira
```

## Example

```javascript
var jira = require('mongodb-js-jira');

// Function to search JIRA for issues that match the provided JQL and writes results to a stream
// @return callback(err) if an error occurs or callback(null, stream) if successful
jira.getJiraIssuesJQL(<jql>, callback);
```

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/jira-api-wrapper.svg
[travis_url]: https://travis-ci.org/mongodb-js/jira-api-wrapper
[npm_img]: https://img.shields.io/npm/v/jira-api-wrapper.svg
[npm_url]: https://npmjs.org/package/jira-api-wrapper
