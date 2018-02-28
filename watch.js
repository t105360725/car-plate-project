'use strict'
const fire_alpr = require('./index.js')
const path = require('path')
const chokidar = require('chokidar')
const watcher = chokidar.watch(path.join(__dirname, './lps/*.*'))
watcher.on('ready', () => {
    watcher.on('add', (path) => {
        var str = path;
		var res = str.split("/")
        fire_alpr.test(res[5])
    })
})
