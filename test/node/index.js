'use strict'

var path = require('path')
var log = require('npmlog')
var fs = require('vigour-fs-promised')
var PackageLinter
var pkgPath = path.join(__dirname, 'package.json')

var initial = {
  name: 'scripts',
  version: '1.0.0',
  description: '',
  main: 'index.js',
  scripts: {
    test: 'echo "Error: no test specified" && exit 1'
  },
  author: '',
  license: 'MIT'
}

// var expected = {
//   name: 'scripts',
//   version: '1.0.0',
//   description: '',
//   main: 'index.js',
//   scripts: {
//     test: "echo 'Error: no test specified' && exit 1"
//   },
//   author: 'AUTHOR',
//   license: 'ISC',
//   keywords: [],
//   bugs: {
//     url: 'https://github.com/OWNER/REPO/issues'
//   },
//   repository: {
//     type: 'git',
//     url: 'git+https://github.com/vigour-io/sbs.git'
//   },
//   contributors: [],
//   homepage: 'https://github.com/OWNER/REPO',
//   dependencies: {},
//   engines: {}
// }

var observed

describe('Package Linter', function () {
  before(function () {
    var json = JSON.stringify(initial)
    return fs.writeFileAsync(pkgPath, json, 'utf8')
  })
  it('require', function () {
    PackageLinter = require('../../')
  })
  it('should not error', function () {
    var linter = new PackageLinter({
      pkgPath: pkgPath
    })
    return linter.start()
      .catch((reason) => {
        log.error('linter threw', reason)
        expect(reason).not.to.exist
      })
  })
  it('should produce a valid json file', function () {
    return fs.readJSONAsync(pkgPath, 'utf8')
      .then((_observed) => {
        observed = _observed
      })
      .catch((reason) => {
        expect(reason).not.to.exist
      })
  })
  it('should not have changed the values already present', function () {
    leafs(initial, (leaf, pth) => {
      var other = observed
      var len = pth.length
      for (let i = 0; i < len; i += 1) {
        other = other[pth[i]]
      }
      expect(leaf).to.equal(other)
    })
  })
  after(function () {
    return fs.removeAsync(pkgPath)
  })
})

function leafs (obj, fn, acc) {
  var _acc = acc || []
  for (var key in obj) {
    _acc.push(key)
    if (typeof obj[key] === 'object') {
      leafs(obj[key], fn, _acc)
    } else {
      fn(obj[key], _acc)
    }
    _acc.pop()
  }
}
