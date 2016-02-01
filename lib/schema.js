'use strict'

var notEmpty = /\S/
var url = /^https?:\/\/[a-z.\-0-9]+/

module.exports = exports = {
  name: {
    pattern: /^[a-zA-Z0-9][a-zA-Z0-9\.\-_]*$/
  },
  version: {
    pattern: /^[0-9]+\.[0-9]+[0-9+a-zA-Z\.\-]+$/
  },
  description: {},
  keywords: {
    defaultValue: []
  },
  bugs: {
    defaultValue: {},
    schema: {
      url: {
        pattern: url
      }
    }
  },
  author: {
    pattern: notEmpty
  },
  contributors: {
    defaultValue: []
  },
  repository: {
    defaultValue: {},
    schema: {
      type: {
        defaultValue: 'git'
      },
      url: {
        pattern: /^(git\+)?https:\/\/github.com\/[a-zA-Z\-0-9]+\/[a-zA-Z\-0-9]+(\.git)?$|^git@github\.com:[a-zA-Z\-0-9]+\/[a-zA-Z\-0-9]+\.git$/
      }
    }
  },
  homepage: {
    pattern: url
  },
  dependencies: {
    defaultValue: {}
  },
  engines: {
    defaultValue: {}
  }
}
