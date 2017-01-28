'use strict';

const gulp = require('gulp');
const polymerBuild = require('polymer-build');
const polymerJson = require('../polymer.json');
const polymerProject = new polymerBuild.PolymerProject(polymerJson);
const filter = require('gulp-filter');
const intercept = require('gulp-intercept');

const jsFilter = filter('**/*.js');

const assert = require('assert');
const expect = require('expect');

describe('Testing functions in <my-view1>', () => {
  let polyobj;

  before(done => {
    let Polymer = data => polyobj = data;

    gulp.src('./src/my-view1.html')
      .pipe(polymerProject.splitHtml())
      .pipe(jsFilter)
      .pipe(intercept(file => eval(file.contents.toString())) )
      .on('end', done);
  });

  it('Add function exists', () => {
    assert(polyobj.add);
  });
  it('Add function adds correctly', () => {
    expect(polyobj.add(1,2)).toBe(3);
  });
});