'use strict';

const path_ = require('path');
const url_ = require('url');

let urlExtra = {};

function _normalize (url) {
    return url
    .replace(/\\/g, '/')
    .replace(/[\/]+/g, '/')
    .replace(/\/\?/g, '?')
    .replace(/\/\#/g, '#')
    .replace(/\:\//g, '://');
}

/**
 * @method normalize
 * @param {string} url
 */
urlExtra.normalize = function (url) {
  return _normalize(url);
};

/**
 * @method join
 */
urlExtra.join = function () {
  let joined = [].slice.call(arguments, 0).join('/');
  return _normalize(joined);
};

/**
 * @method dirname
 * @param {string} url
 */
urlExtra.dirname = function (url) {
  let dirname = path_.dirname(url);
  if (dirname === '.') {
    return '';
  }
  return _normalize(dirname);
};

/**
 * @method extname
 */
urlExtra.extname = path_.extname;

/**
 * @method basename
 * @param {string} url
 * @param {string} extname
 */
urlExtra.basename = function (url, extname) {
  if (urlExtra.dirname(url) === '') {
    let basename = path_.basename(url);
    return basename.substring(0, basename.length - 1);
  }

  return path_.basename(url, extname);
};

/**
 * @method basenameNoExt
 * @param {string} url
 */
urlExtra.basenameNoExt = function (url) {
  return urlExtra.basename(url, urlExtra.extname(url));
};

/**
 * @method randomQuery
 * @param {string} url
 */
let _queryIndices = {};
urlExtra.randomQuery = function (url) {
  let queryIndex = _queryIndices[url] || 0;
  _queryIndices[url] = ++queryIndex;
  if (queryIndex < 10) {
    return url + '?00' + queryIndex;
  } else if (queryIndex < 100) {
    return url + '?0' + queryIndex;
  }

  return url + '?' + queryIndex;
};

// ========================================
// exports
// ========================================

let _ = {};
for (let p in url_) {
  _[p] = url_[p];
}
for (let p in urlExtra) {
  _[p] = urlExtra[p];
}

module.exports = _;
