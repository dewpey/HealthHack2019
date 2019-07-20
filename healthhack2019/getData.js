const admin = require("firebase-admin");
// Fetch the service account key JSON file contents
const serviceAccount = require("./key.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://healthhack2019-e97d2.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const ref = db.ref("");

exports.handler = function(event, context, callback) {
    ref.on("pharmacies", function(snapshot) {
  console.log(snapshot.val());
  callback(null, {"message": snapshot.val()});
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  callback(null, {"error": errorObject.code});
});
    
}