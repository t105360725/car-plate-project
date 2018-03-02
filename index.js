'use strict'

// Shotting 
const exec = require('child_process').exec;
var shots = () => exec('sh shot.sh');

const path = require('path')
const chokidar = require('chokidar')
const watcher = chokidar.watch(path.join(__dirname, './lps/*.*'))
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

// Shotting
shots()

// Start openalpr
openalpr.Start ()
openalpr.GetVersion ()

// Watch new photos
watcher.on('ready', () => {
    watcher.on('add', (path) => {
        var str = path;
		var res = str.split("/")
        // ref.push(fire_alpr.test(res[5]))
        var path = "lps/" + res[5]
    	openalpr.IdentifyLicense (path, function (error, output) {
	        var results = output.results;
	        if (results.length > 0) {
	            console.log("Processing time: " + output.processing_time_ms + " Number Plate: " + results[0].plate)
	            let current_time_stamp = new Date().getTime()
	            res.number = results[0].plate
	            res.time = parseInt(current_time_stamp / 1000)
	            ref.push(res)
	            console.log("Upload success!")
	        }
	        else {
	            console.log ("No results");
	        }
    	})
    })
})
