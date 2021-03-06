'use strict'

const path = require('path')
const chokidar = require('chokidar')
const watcher = chokidar.watch(path.join(__dirname, './lps/*.*'), {
	awaitWriteFinish: {
		stabilityThreshold: 2000,
		pollInterval: 100
	}})
var openalpr = require ("node-openalpr")

// Connect to firebase database 
var firebase = require("firebase")

var config = {
	apiKey: "AIzaSyAPQCtYByX43Jejr5l1f5uv6-kHIGU7sJc",
	authDomain: "care-8e4c7.firebaseapp.com",
	databaseURL: "https://care-8e4c7.firebaseio.com",
	projectId: "care-8e4c7",
	storageBucket: "care-8e4c7.appspot.com",
	messagingSenderId: "511100821138"
};
firebase.initializeApp(config);
var db = firebase.database();
var ref = db.ref("/");

// Start openalpr
openalpr.Start ()
openalpr.GetVersion ()

// Watch new photos
watcher.on('ready', () => {
	watcher.on('add', (path) => {
		var str = path;
		var res = str.split("/")
		var path = "lps/" + res[5]
		var result = {}
		openalpr.IdentifyLicense (path, function (error, output) {
			var results = output.results;
			if (results.length > 0) {
				for (var i = 0; i < results.length; i++) {
					console.log(results[i].plate)
					let current_time_stamp = new Date().getTime()
					result.number = results[i].plate
					result.time = parseInt(current_time_stamp / 1000)
					ref.push(result)
					console.log(result)
					console.log("Upload success!")
				}
				// console.log(result)
				// console.log("Processing time: " + output.processing_time_ms + " Number Plate: " + results[0].plate)
			}
			else {
				console.log ("No results");
			}
		})
	})
})
