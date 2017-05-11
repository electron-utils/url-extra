'use strict';

const path_ = require('path');
const url_ = require('url');

let urlPlus = {};

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
urlPlus.normalize = function (url) {
  return _normalize(url);
};

/**
 * @method join
 */
urlPlus.join = function () {
  let joined = [].slice.call(arguments, 0).join('/');
  return _normalize(joined);
};

/**
 * @method dirname
 * @param {string} url
 */
urlPlus.dirname = function (url) {
  let dirname = path_.dirname(url);
  if (dirname === '.') {
    return '';
  }
  return _normalize(dirname);
};

/**
 * @method extname
 */
urlPlus.extname = path_.extname;

/**
 * @method basename
 * @param {string} url
 * @param {string} extname
 */
urlPlus.basename = function (url, extname) {
  if (urlPlus.dirname(url) === '') {
    let basename = path_.basename(url);
    return basename.substring(0, basename.length - 1);
  }

  return path_.basename(url, extname);
};

/**
 * @method basenameNoExt
 * @param {string} url
 */
urlPlus.basenameNoExt = function (url) {
  return urlPlus.basename(url, urlPlus.extname(url));
};

/**
 * @method randomQuery
 * @param {string} url
 */
let _queryIndices = {};
urlPlus.randomQuery = function (url) {
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
for (let p in urlPlus) {
  _[p] = urlPlus[p];
}

module.exports = _;
