// require node modules

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3010;
const morgan = require('morgan');
const mongoose = require("mongoose")
const db = require("./models/index")
//  const seed = require('./seeders/seed');
// fix workouts.js file to match seeder file.
// update get api/workouts route. 
// have a post api/workouts route.  

app.use(morgan("dev"));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


 mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

 app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
      .then( Workout => {
          res.json(Workout);
      })
      .catch( err => {
          res.status(400).json(err);
      });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).sort({ _id: -1 })
      .then( Workout => {
      res.send(Workout);
      })
      .catch(err => {
      res.status(400).json(err);
      });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log("req", req.body)
      db.Workout.findOneAndUpdate(
          {_id: req.params.id}, 
          {$push: {exercises: req.body}}
          ).then( Workout => {
          
          res.send(Workout);
          })
          .catch(err => {
          res.status(400).json(err);
          });
  });
  


// file path for html docs.
app.get('/exercise', function (req, res) {
  res.sendFile(__dirname + '/public/exercise.html')
})

app.get('/stats', function (req, res) {
  res.sendFile(__dirname + '/public/stats.html')
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  

