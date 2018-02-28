'use strict'
const fire_alpr = require('./index.js')
const path = require('path');
const chokidar = require('chokidar');
const watcher = chokidar.watch(path.join(__dirname, './lps/*.*'));
watcher.on('ready', () => {
    watcher.on('change', (path) => {
        console.log(path);
    });
    watcher.on('add', (path) => {
        // console.log(path);
        var str = path;
		var res = str.split("/");
		// console.log(res[5])
        fire_alpr.test(res[5])
    });
    watcher.on('unlink', (path) => {
        console.log(path);
    });
});
