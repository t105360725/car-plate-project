exports.test = (name) => {

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

    var openalpr = require ("node-openalpr");

    function identify (path) {
        openalpr.IdentifyLicense (path, function (error, output) {
            var results = output.results;

            if (results.length > 0) {
                console.log("Processing time: " + output.processing_time_ms + "Number Plate: " + results[0].plate)
                let current_time_stamp = new Date().getTime()

                var value = {
                    number: results[0].plate,
                    time: parseInt(current_time_stamp / 1000)
                }
                ref.push(value);
            }
            else {
                console.log ("No results");
            }

        });
    }

    openalpr.Start ();
    openalpr.GetVersion ();
    identify ("lps/" + name)
}