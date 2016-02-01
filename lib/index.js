'use strict'

var path = require('path')
var Config = require('vigour-config')
var fs = require('vigour-fs-promised')

module.exports = exports = PackageLinter

function PackageLinter (config) {
  if (!(config instanceof Config)) {
    config = new Config(config)
  }
  // console.log('initial config', config.plain())
  config.set({
    cwd: process.cwd()
  })
  if (!config.pkgPath.val) {
    config.set({
      pkgPath: path.join(config.cwd.val, 'package.json')
    })
  }
  this.config = config
  // console.log('final config', config.plain())
}

PackageLinter.prototype.schema = require('./schema')
PackageLinter.prototype.validateSchema = require('./validateSchema')

PackageLinter.prototype.start = function () {
  return fs.readJSONAsync(this.config.pkgPath.val)
    .then((pkg) => {
      var newPkg = this.validateSchema(pkg, this.schema)
      return fs.writeJSONAsync(this.config.pkgPath.val, newPkg, { space: 2 })
    })
}
