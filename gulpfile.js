'use strict';

const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const filePaths = {
	html: './src/**/*.html',
	css: './src/css/**/*.css',
	js: './src/js/**/*.js',
};

// Watch Task
function watchTask() {
	browserSync.init({
		server: {
			baseDir: './src',
			port: 3000,
		},
	});
	watch([filePaths.html, filePaths.css, filePaths.js]).on(
		'change',
		browserSync.reload
	);
}

exports.default = watchTask;
