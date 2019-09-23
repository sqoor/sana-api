const express = require("express");
const cors = require("cors");
const mongo = require("./database");

const app = express();
app.use(express.json());
app.use(cors());



// @GET
// Return All Workers From Database
app.get('/workers', (req, res) => {
  mongo.getWorkers(result => {
    res.json(result)
  })
})

// @POST
// Add New Worker To Database.
app.post('/worker', (req, res) => {
  mongo.addNewWorker(req.body, (response) => {
    res.json(response);
  })
})

// @PUT
// Update Worker Information.
app.put('/worker/:id/:info', (req, res) => {
  let workerID = req.params.id
  let newWorkerInfo = req.params.info;
  mongo.updateWorkerInfo(workerID, newWorkerInfo, response => {
    res.json(response)
  })
})

// @DELETE
// Delete Specific Repository To Database.
app.delete('/worker-account/:id', (req, res) => {
  // let repoID = req.originalUrl.slice(14)
  let workerID = req.params.id
  mongo.deleteWorkerAccount(workerID, response => {
    res.json(response);
  })
})


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));