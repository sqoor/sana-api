// Import Mongoose Files
const mongoose = require('mongoose');
// Store 'mongoose.connection' in Variable Called "db".
const db = mongoose.connection;
// Connect This File To My DataBase.

// mongodb://<dbuser>:<dbpassword>@ds117348.mlab.com:17348/sana
// mongodb://localhost/9an3ah-users
mongoose.connect('mongodb://sana:a1234567@ds117348.mlab.com:17348/sana', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Mongoose Connected Successfully *.*');
    console.log('__________________________________________________')
  })
  .catch(error => { console.log(`${error} -_-`) });


// Create New Mongo Scheme To Store Our Data Inside It.
let workersSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    require: true
  },
  experience: {
    type: Number,
    required: true
  },
  field: {
    type: String,
    require: true
  },
  hourlyFare: {
    type: Number,
    require: true
  }
})

// Store The Scheme In Variable To Deal With This Variable.
let Workers = mongoose.model('Workers', workersSchema);

// @METHOD 'getWorkers'
// Return All Workers From Database
let getWorkers = (callBack) => {
  console.log(callBack);
  Workers.find({}, (error, response) => {
    if (error) {
      callBack(error);
    } else {
      callBack(response);
    }
  })
}

// @METHOD
// Add Specific Worker To Database.
let addNewWorker = (newWorker, callBack) => {
  Workers.create(newWorker, (error, response) => {
    if (error) {
      callBack(error)
    } else {
      getWorkers(callBack)
    }
  })
}

// @ METHOD
// Update Private Status Of a Specific Worker In Database.
let updateWorkerInfo = (workerID, newWorkerInfo, callBack) => {
  console.log('Workers', Workers)
  Workers.updateOne({ _id: workerID }, { $set: { status: newWorkerInfo } }, (error, response) => {
    if (error) {
      callBack(error)
    } else {
      getWorkers(callBack)
    }
  })
}

// @ METHOD
// Delete Specific Worker From Database.
let deleteWorkerAccount = (workerID, callBack) => {
  Workers.findOneAndDelete({ _id: workerID }, (error, response) => {
    if (error) {
      callBack(error);
    } else {
      getWorkers(callBack);
    }
  })
}

// Export Our "Database Methods" To Deal With It In Our "Express Server".
module.exports = {
  getWorkers,
  addNewWorker,
  updateWorkerInfo,
  deleteWorkerAccount
}