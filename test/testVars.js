require('dotenv').config();

var URL = process.env.JIRA_URL;
var auth = {
  user: process.env.JIRA_USER,
  pass: process.env.JIRA_PASS
};

module.exports = {
  issuesOptions: {
    uri: URL + '/search',
    auth: auth,
    json: true,
    qs: {
      'jql': '',
      'startAt': 0,
      'maxResults': 50
    }
  },

  issuesOutput: {
    'expand': 'schema,names',
    'startAt': 0,
    'maxResults': 50,
    'total': 6,
    'issues': [
      {
        'expand': 'html',
        'id': '10230',
        'self': 'http://kelpie9:8081/rest/api/2/issue/BULK-62',
        'key': 'BULK-62',
        'fields': {
          'summary': 'testing',
          'timetracking': null,
          'issuetype': {
            'self': 'http://kelpie9:8081/rest/api/2/issuetype/5',
            'id': '5',
            'description': 'The sub-task of the issue',
            'iconUrl': 'http://kelpie9:8081/images/icons/issue_subtask.gif',
            'name': 'Sub-task',
            'subtask': true
          },
          'customfield_10071': null
        },
        'transitions': 'http://kelpie9:8081/rest/api/2/issue/BULK-62/transitions'
      },
      {
        'expand': 'html',
        'id': '10004',
        'self': 'http://kelpie9:8081/rest/api/2/issue/BULK-47',
        'key': 'BULK-47',
        'fields': {
          'summary': 'Cheese v1 2.0 issue',
          'timetracking': null,
          'issuetype': {
            'self': 'http://kelpie9:8081/rest/api/2/issuetype/3',
            'id': '3',
            'description': 'A task that needs to be done.',
            'iconUrl': 'http://kelpie9:8081/images/icons/task.gif',
            'name': 'Task',
            'subtask': false
          },
          'customfield_10071': null
        },
        'transitions': 'http://kelpie9:8081/rest/api/2/issue/BULK-47/transitions'
      }
    ]
  }
};
