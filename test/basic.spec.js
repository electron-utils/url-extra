'use strict';

const tap = require('tap');
const urlExtra = require('../index');

tap.test('urlExtra.normalize', t => {
  // should work for simple case
  t.equal(
    urlExtra.normalize('assets://\\foobar\\hello.fire'),
    'assets://foobar/hello.fire'
  );

  // should work for white space case
  t.equal(
    urlExtra.normalize('assets://\\foo\ bar\\hello.fire'),
    'assets://foo bar/hello.fire'
  );

  t.end();
});

tap.test('urlExtra.join', t => {
  // should be able to join protocol
  t.equal(
    urlExtra.join('http://www.google.com/', 'foo/bar', '?test=123'),
    'http://www.google.com/foo/bar?test=123'
  );

  // should be able to join protocol
  t.equal(
    urlExtra.join('http:', 'www.google.com/', 'foo/bar', '?test=123'),
    'http://www.google.com/foo/bar?test=123'
  );

  // should remove extra slashes
  t.equal(
    urlExtra.join('http:', 'www.google.com///', 'foo/bar', '?test=123'),
    'http://www.google.com/foo/bar?test=123'
  );

  // should support anchors in urls
  t.equal(
    urlExtra.join('http://', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa'),
    'http://www.google.com/foo/bar?test=123#faaaaa'
  );

  // should support different protocol
  t.equal(
    urlExtra.join('assets://', 'foo', '/bar', 'foobar.png'),
    'assets://foo/bar/foobar.png'
  );

  t.end();
});

tap.test('urlExtra.dirname', t => {
  // should work for simple case
  t.equal(
    urlExtra.dirname('assets://foo/bar/foobar.png'),
    'assets://foo/bar'
  );

  // should support bare directory
  t.equal(
    urlExtra.dirname('assets://foo/bar/'),
    'assets://foo'
  );

  // should support root directory
  t.equal(
    urlExtra.dirname('assets://foo/'),
    'assets://'
  );

  // should be empty if we pass protocol
  t.equal(
    urlExtra.dirname('assets://'),
    ''
  );

  t.end();
});

tap.test('urlExtra.basename', t => {
  // should work for simple case
  t.equal(
    urlExtra.basename('assets://foo/bar/foobar.png'),
    'foobar.png'
  );

  // should support bare directory
  t.equal(
    urlExtra.basename('assets://foo/bar/'),
    'bar'
  );

  // should be protocol name
  t.equal(
    urlExtra.basename('assets://'),
    'assets'
  );

  t.end();
});