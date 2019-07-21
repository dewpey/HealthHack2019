const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./key.json");
const Routific = require('routific');
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://healthhack2019-e97d2.firebaseio.com/"
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDMzNTVlMTc2ODM0YjdhOWZhM2Y1ZDMiLCJpYXQiOjE1NjM2NDU0MDl9.z-gI7dkl-6f-9UrqlBoe-52tq8j-rNEjtTBzn1oWUCE'
const options = {
  token: token
}
const client = new Routific.Client(options);
const vrp = new Routific.Vrp();

const db = admin.database();
const ref = db.ref("current");

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const visits = [{
      id: "Missouri 51 Junction C, Zalma, MO 63787",
      location: {
        name: "Jack Smith",
        address: "Missouri 51 Junction C, Zalma, MO 63787"
      },
      duration: 3
    },
    {
      id: "575 MO-51, Puxico, MO 63960",
      location: {
        name: "Bill Mayers",
        address: "575 MO-51, Puxico, MO 63960"
      },
      start: "8:00",
      end: "16:00",
      duration: 3
    },
    {
      id: "3WFG+HR Arab, Wayne Township, Puxico, MO 63960",
      location: {
        name: "Marc Kuo",
        address: "3WFG+HR Arab, Wayne Township, Puxico, MO 63960"
      },
      duration: 3
    },
    {
      id: "3W8H+93 Arab, Wayne Township, MO",
      location: {
        name: "Anita Zimmerman",
        address: "3W8H+93 Arab, Wayne Township, MO"
      },
      duration: 3
    },
    {
      id: "3253 MO-51, Puxico, MO 63960",
      location: {
        name: "Drew Smith",
        address: "3253 MO-51, Puxico, MO 63960"
      },
      duration: 3
    },
    {
      id: "3WX85+MV Acorn Ridge, New Lisbon Township, MO",
      location: {
        name: "Holly Hills",
        address: "3WX85+MV Acorn Ridge, New Lisbon Township, MO"
      },
      duration: 3
    },
    {
      id: "WX74+9Q Acorn Ridge, New Lisbon Township",
      location: {
        name: " David Daniels",
        address: "WX74+9Q Acorn Ridge, New Lisbon Township"
      },
      duration: 3
    },
    {
      id: "10225 Co Rd 250, Puxico, MO 63960",
      location: {
        name: " Olivia Tyson",
        address: "10225 Co Rd 250, Puxico, MO 63960"
      },
      duration: 3
    },
    {
      id: "VRWH+5W Asherville, Duck Creek Township, MO",
      location: {
        name: "Ash Daniels",
        address: "VRWH+5W Asherville, Duck Creek Township, MO"
      },
      duration: 3
    },
    {
      id: "18235 Co Rd 491, Puxico, MO 63960",
      location: {
        name: "Tucker Thompson",
        address: "18235 Co Rd 491, Puxico, MO 63960"
      },
      duration: 3
    },
    {
      id: "16724 Co Rd 491, Dudley, MO 63936",
      location: {
        name: "Richard Dudley",
        address: "16724 Co Rd 491, Dudley, MO 63936"
      },
      duration: 3
    },
    {
      id: "24036 County Road 271, Puxico, MO 63960",
      location: {
        name: "Mohammed Elkady",
        address: "24036 County Road 271, Puxico, MO 63960"
      },
      duration: 3
    },
    {
      id: "7142 County Road 266, Puxico, MO 63960",
      location: {
        name: "Nadine Elkady",
        address: "7142 County Road 266, Puxico, MO 63960"
      },
      duration: 3
    },
    {
      id: "7277 State Highway Pp, Puxico, MO 63960",
      location: {
        name: "Halle Farrar",
        address: "7277 State Highway Pp, Puxico, MO 63960"
      },
      duration: 3
    },
    {
      id: "298 County Road 507, Wappapello, MO 63966",
      location: {
        name: "Evan Parker",
        address: "298 County Road 507, Wappapello, MO 63966"
      },
      duration: 3
    },
    {
      id: "3820 Hc 3, Greenville, MO 63944",
      location: {
        name: "Harrison Green",
        address: "3820 Hc 3, Greenville, MO 63944"
      },
      duration: 3
    },
    {
      id: "175 County Road 510, Wappapello, MO 63966",
      location: {
        name: "Sarah Storm",
        address: "175 County Road 510, Wappapello, MO 63966"
      },
      duration: 3
    },
    {
      id: "90 Kyle Ln, Poplar Bluff, MO 63901",
      location: {
        name: "Adeesh Mishra",
        address: "90 Kyle Ln, Poplar Bluff, MO 63901"
      },
      duration: 3
    },
    {
      id: "2327 Highway W, Poplar Bluff, MO 63901",
      location: {
        name: "Samantha Saba",
        address: "2327 Highway W, Poplar Bluff, MO 63901"
      },
      duration: 3
    },
    {
      id: "912 County Road 504, Williamsville, MO 63967",
      location: {
        name: "Oliver Chrysler",
        address: "912 County Road 504, Williamsville, MO 63967"
      },
      duration: 3
    },
    {
      id: "384 Remington Pl, Poplar Bluff, MO 63901",
      location: {
        name: "Mercedes Lewis",
        address: "384 Remington Pl, Poplar Bluff, MO 63901"
      },
      duration: 3
    },
    {
      id: "1400 Highway Nn, Poplar Bluff, MO 63901",
      location: {
        name: "Cadalliac Johnson",
        address: "1400 Highway Nn, Poplar Bluff, MO 63901"
      },
      duration: 3
    },
    {
      id: "1006 N Main St, Poplar Bluff, MO 63901",
      location: {
        name: "Taylor Castillo",
        address: "1006 N Main St, Poplar Bluff, MO 63901"
      },
      duration: 3
    },
    {
      id: "163 Fairway Dr, Poplar Bluff, MO 63901",
      location: {
        name: "John Petra",
        address: "163 Fairway Dr, Poplar Bluff, MO 63901"
      },
      duration: 3
    },
    {
      id: "0 W Cr # 465, Poplar Bluff, MO 63901",
      location: {
        name: "Joakim Noah",
        address: "0 W Cr # 465, Poplar Bluff, MO 63901"
      },
      duration: 3
    },
    {
      id: req.body.address,
      location: {
        name: req.body.name,
        address: req.body.address
      },
      duration: 3
    }
  ]

  console.log(req.body)
  visits.map((visit) => {
    vrp.addVisit(visit.id, visit);
  })

  // Step 5: Add your vehicles
  const vehicles = [{
      id: "Puxico Drugs 1",
      start_location: {
        address: "190 E Richardson Ave, Puxico, MO 63960, USA"
      },
      end_location: {
        address: "190 E Richardson Ave, Puxico, MO 63960, USA"
      }
    },
    {
      id: "Puxico Drugs 2",
      start_location: {
        address: "190 E Richardson Ave, Puxico, MO 63960, USA"
      },
      end_location: {
        address: "190 E Richardson Ave, Puxico, MO 63960, USA"
      }
    },
    {
      id: "Town Pharmacy",
      start_location: {
        address: "700 MO-25, Bloomfield, MO 63825, USA"
      },
      end_location: {
        address: "700 MO-25, Bloomfield, MO 63825, USA"
      }
    },
    {
      id: "Super Town & Country Pharmacy",
      start_location: {
        address: "707 Specialty Dr, Dexter, MO 63841, USA"
      },
      end_location: {
        address: "707 Specialty Dr, Dexter, MO 63841, USA"
      }
    },
    {
      id: "Advance Pharmacy",
      start_location: {
        address: "110 N Oak St, Advance, MO 63730, USA"
      },
      end_location: {
        address: "110 N Oak St, Advance, MO 63730, USA"
      }
    },
  ]

  vehicles.map((vehicle) => {
    vrp.addVehicle(vehicle.id, vehicle);
  })

  // Step 6: Add traffic speed
  vrp.addOption("traffic", "fast");
  vrp.addOption("polylines", true);
  vrp.addOption("balance", true);
  vrp.addOption("min_visits_per_vehicle", 2);
  //vrp.addOption("visit_balance_coefficient", 0.5);
  // Step 7: Send request
  client.route(vrp, (err, solution, jobId) => {
    if (err) {
      console.log("An error occurred");
      console.log(err);
      res.send(err)
    } else if (solution.status == "success") {
      console.log("Solution is:")
      console.log(JSON.stringify(solution))
      ref.set(solution)
      res.send(JSON.stringify(solution))
    }
  })
});