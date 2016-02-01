'use strict'

var log = require('npmlog')

module.exports = exports = function (pkg, schema, _acc) {
  var acc = _acc || []
  for (let key in schema) {
    acc.push(key)
    if (!pkg[key]) {
      pkg[key] = schema[key].defaultValue
          ? schema[key].defaultValue
          : ''
    }
    if (schema[key].pattern && !pkg[key].match(schema[key].pattern)) {
      log.warn('`' + acc.join('.') + '`' +
        ' field should match ' +
        '`' + schema[key].pattern.toString() + '`')
    }
    if (schema[key].schema) {
      exports(pkg[key], schema[key].schema, acc)
    }
    acc.pop()
  }
  return pkg
}
