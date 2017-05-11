'use strict';

const tap = require('tap');
const urlPlus = require('../index');

tap.test('urlPlus.normalize', t => {
  // should work for simple case
  t.equal(
    urlPlus.normalize('assets://\\foobar\\hello.fire'),
    'assets://foobar/hello.fire'
  );

  // should work for white space case
  t.equal(
    urlPlus.normalize('assets://\\foo\ bar\\hello.fire'),
    'assets://foo bar/hello.fire'
  );

  t.end();
});

tap.test('urlPlus.join', t => {
  // should be able to join protocol
  t.equal(
    urlPlus.join('http://www.google.com/', 'foo/bar', '?test=123'),
    'http://www.google.com/foo/bar?test=123'
  );

  // should be able to join protocol
  t.equal(
    urlPlus.join('http:', 'www.google.com/', 'foo/bar', '?test=123'),
    'http://www.google.com/foo/bar?test=123'
  );

  // should remove extra slashes
  t.equal(
    urlPlus.join('http:', 'www.google.com///', 'foo/bar', '?test=123'),
    'http://www.google.com/foo/bar?test=123'
  );

  // should support anchors in urls
  t.equal(
    urlPlus.join('http://', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa'),
    'http://www.google.com/foo/bar?test=123#faaaaa'
  );

  // should support different protocol
  t.equal(
    urlPlus.join('assets://', 'foo', '/bar', 'foobar.png'),
    'assets://foo/bar/foobar.png'
  );

  t.end();
});

tap.test('urlPlus.dirname', t => {
  // should work for simple case
  t.equal(
    urlPlus.dirname('assets://foo/bar/foobar.png'),
    'assets://foo/bar'
  );

  // should support bare directory
  t.equal(
    urlPlus.dirname('assets://foo/bar/'),
    'assets://foo'
  );

  // should support root directory
  t.equal(
    urlPlus.dirname('assets://foo/'),
    'assets://'
  );

  // should be empty if we pass protocol
  t.equal(
    urlPlus.dirname('assets://'),
    ''
  );

  t.end();
});

tap.test('urlPlus.basename', t => {
  // should work for simple case
  t.equal(
    urlPlus.basename('assets://foo/bar/foobar.png'),
    'foobar.png'
  );

  // should support bare directory
  t.equal(
    urlPlus.basename('assets://foo/bar/'),
    'bar'
  );

  // should be protocol name
  t.equal(
    urlPlus.basename('assets://'),
    'assets'
  );

  t.end();
});