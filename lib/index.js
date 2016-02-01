'use strict'

var log = require('npmlog')
var Config = require('vigour-config')
var fs = require('vigour-fs-promised')

module.exports = exports = PackageLinter

function PackageLinter (config) {
  if (!(config instanceof Config)) {
    config = new Config(config)
  }
  // log.info('initial config', config.plain())
  if (!config.path) {
    config.pkgPath = config.cwd
  }
  this.config = config
  // log.info('final config', config.plain())
}

PackageLinter.prototype.schema = require('./schema')
PackageLinter.prototype.validateSchema = require('./validateSchema')

PackageLinter.prototype.start = function () {
  log.info('\n' +
    'This utility will walk you through linting a package.json file ' +
    'according to the standardjs specifications.' +
    '\n\n' +
    'Press ^C at any time to quit.' +
    '\n\n')
  return fs.readJSONAsync(this.config.pkgPath.val)
    .then((pkg) => {
      var newPkg = this.validateSchema(pkg, this.schema)
      return fs.writeJSONAsync(this.config.pkgPath.val, newPkg)
    })
}
