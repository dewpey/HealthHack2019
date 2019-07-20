const Routific = require('routific')
const axios = require('axios');
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
const ref = db.ref("current");



exports.handler = function (event, context, callback) {
    // This is your demo token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDMzNTVlMTc2ODM0YjdhOWZhM2Y1ZDMiLCJpYXQiOjE1NjM2NDU0MDl9.z-gI7dkl-6f-9UrqlBoe-52tq8j-rNEjtTBzn1oWUCE'
    var config = {
        headers: { 'Authorization': "bearer " + token }
    };
    const options = { token: token }
    const client = new Routific.Client(options);

    // Step 3: Initialize VRP service
    const vrp = new Routific.Vrp();

    const visits = [
        {
            id: "1",
            location: { name: "Jack Smith", address: "24898 State Hwy AB, Essex, MO 63846" },
            start: "9:00",
            end: "17:00",
            duration: 3
        },
        {
            id: "2",
            location: { name: "Bob Smith", address: "25021 Walnut St, Bell City, MO 63735" },
            start: "9:00",
            end: "17:00",
            duration: 3
        },
        {
            id: "3",
            location: { name: "Jeff Smith", address: "25498 MO-91, Bell City, MO 63735" },
            start: "9:00",
            end: "17:00",
            duration: 3
        }
    ]

    visits.push({
        id: "4",
        location: { name: event.body.name, address: event.body.address },
        start: "9:00",
        end: "17:00",
        duration: 3
    })
    /*
        var bodyParameters = {
            "name": "Bluechew Delivery",
            "date": "2019-10-01",
            "drivers": [
                {
                    "name": "L & S Pharmacy",
                    "start_location": {
                        "address": "406 S Main St, Charleston, MO 63834, USA",
                    },
                    "end_location": {
                        "address": "406 S Main St, Charleston, MO 63834, USA",
                    },
                    "shift_start": "09:00",
                    "shift_end": "17:00",
                    "phone_number": "+15736833307",
                    "speed": 1,
                    "capacity": 35
                },
                {
                    "name": "Sterling Pharmacy",
                    "start_location": {
                        "address": "808 Hunter Ave #1a, Sikeston, MO 63801, USA",
                    },
                    "end_location": {
                        "address": "808 Hunter Ave #1a, Sikeston, MO 63801, USA",
                    },
                    "shift_start": "09:00",
                    "shift_end": "17:00",
                    "phone_number": "+15734751900",
                    "speed": 1,
                    "capacity": 35
                },
                {
                    "name": "Town Pharmacy",
                    "start_location": {
                        "address": "700 MO-25, Bloomfield, MO 63825, USA",
                    },
                    "end_location": {
                        "address": "700 MO-25, Bloomfield, MO 63825, USA",
                    },
                    "shift_start": "09:00",
                    "shift_end": "17:00",
                    "phone_number": "+15735682643",
                    "speed": 1,
                    "capacity": 35
                },
                {
                    "name": "Advance Pharmacy",
                    "start_location": {
                        "address": "110 N Oak St, Advance, MO 63730, USA",
                    },
                    "end_location": {
                        "address": "110 N Oak St, Advance, MO 63730, USA",
                    },
                    "shift_start": "09:00",
                    "shift_end": "17:00",
                    "phone_number": "+15737223562",
                    "speed": 1,
                    "capacity": 35
                },
                {
                    "name": "Chaffee Medicap Pharmacy",
                    "start_location": {
                        "address": "211 W Yoakum Ave, Chaffee, MO 63740, USA",
                    },
                    "end_location": {
                        "address": "211 W Yoakum Ave, Chaffee, MO 63740, USA",
                    },
                    "shift_start": "09:00",
                    "shift_end": "17:00",
                    "phone_number": "+15738872622",
                    "speed": 1,
                    "capacity": 35
                },
            ],
            "stops": [
                {
                    "name": "Jane Doe",
                    "location": {
                        "address": "24898 State Hwy AB, Essex, MO 63846"
                    },
                    "duration": 3,
                    "load": 1,
                    "priority": true,
                    "phone_number": "+16046204589",
                    "email": "jane@doe.com",
                    "notes": "Press 304 at buzzer.",
                    "custom_notes": {}
                },
                {
                    "name": "Jane Doe",
                    "location": {
                        "address": "25021 Walnut St, Bell City, MO 63735"
                    },
                    "duration": 3,
                    "load": 1,
                    "priority": true,
                    "phone_number": "+16046204589",
                    "email": "jane@doe.com",
                    "notes": "Press 304 at buzzer.",
                    "custom_notes": {}
                }
            ],
            "settings": {
                "max_stop_lateness": 320,
                "max_driver_overtime": 320,
                "shortest_distance": true,
                "traffic": 1.4,
                "strict_start": true,
                "auto_balance": true,
                "default_load": 1,
                "default_duration": 10
            }
        }
    
        bodyParameters.stops.push({
            "name": event.body.name,
            "location": {
                "address": event.body.address
            },
            "duration": 3,
            "load": 1,
            "priority": true,
            "phone_number": "+16046204589",
            "email": "jane@doe.com",
            "notes": "Press 304 at buzzer.",
            "custom_notes": {}
        })
    
        axios.post(
            //'https://product-api.routific.com/v1.0/project',
            'https://api.routific.com/v1/vrp',
            bodyParameters,
            config)
            .then(function (response) {
                callback(null, { "message": JSON.stringify(response) });
            })
            .catch(function (error) {
                callback(null, { "message": error });
            });
    */

    visits.map((visit) => {
        vrp.addVisit(visit.id, visit);
    })

    // Step 5: Add your vehicles
    const vehicles = [
        {
            name: "L & S Pharmacy",
            start_location: {
                address: "406 S Main St, Charleston, MO 63834, USA",
            },
            end_location: {
                address: "406 S Main St, Charleston, MO 63834, USA",
            },
            shift_start: "09:00",
            shift_end: "17:00",
            phone_number: "+15736833307",
            speed: 1,
            capacity: 35
        }
    ]

    vehicles.map((vehicle) => {
        vrp.addVehicle(vehicle.id, vehicle);
    })

    // Step 6: Add traffic speed
    vrp.addOption("traffic", "slow");

    // Step 7: Send request
    client.route(vrp, (err, solution, jobId) => {
        if (err) {
            console.log("An error occurred");
            console.log(err);
            callback(null, {"error": err});
        } else if (solution.status == "success") {
            console.log("Solution is:")
            callback(null, {"message": JSON.stringify(solution)});
            console.log(JSON.stringify(solution))
            //ref.set(solution)
        }
    })

}