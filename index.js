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
  
  ref = db.ref("/");

//

var openalpr = require ("node-openalpr");

var lp_result = ""

function identify (path) {
  openalpr.IdentifyLicense (path, function (error, output) {
    var results = output.results;
    console.log (output.processing_time_ms +" "+ ((results.length > 0) ? results[0].plate : "No results"));
    
    let current_time_stamp = new Date().getTime()

    var value = {
     number: results[0].plate,
     time: parseInt(current_time_stamp / 1000)
   }
   
   console.log(value)
   ref.push(value);
  // if (id == 349) {
           //  console.log (openalpr.Stop ());
        // }
      });
}

openalpr.Start ();
openalpr.GetVersion ();

identify ("lps/" + name)

// for (var i = 0; i < 350; i++) {
//     identify (i, "lp.jpeg");
// }

// ref.push(value);
var ref = db.ref("/");
ref.once("value", function(snapshot) {
 console.log('========database files========')
 console.log(snapshot.val());
});

}