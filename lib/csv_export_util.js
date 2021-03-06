/* eslint block-scoped-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

if (_util2['default'].canUseDOM()) {
  var filesaver = require('./filesaver');
  var saveAs = filesaver.saveAs;
}

function toString(data, keys) {
  var dataString = '';
  if (data.length === 0) return dataString;

  dataString += keys.map(function (x) {
    return x.header;
  }).join(',') + '\n';

  data.map(function (row) {
    keys.map(function (col, i) {
      var field = col.field;
      var format = col.format;

      var value = typeof format !== 'undefined' ? format(row[field], row) : row[field];
      var cell = typeof value !== 'undefined' ? '"' + value + '"' : '';
      dataString += cell;
      if (i + 1 < keys.length) dataString += ',';
    });

    dataString += '\n';
  });

  return dataString;
}

var exportCSV = function exportCSV(data, keys, filename) {
  var dataString = toString(data, keys);
  if (typeof window !== 'undefined') {
    saveAs(new Blob([dataString], { type: 'text/plain;charset=utf-8' }), filename, true);
  }
};

exports['default'] = exportCSV;
module.exports = exports['default'];