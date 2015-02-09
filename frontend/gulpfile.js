"use strict";

var gulp = require('gulp');
var evidentBuild = require('evident-gulp-build');
var settings = evidentBuild.settings;
settings.indexPagePattern = /^\/(post|posts|login)(\/.*)?$/;
evidentBuild.register(gulp);
