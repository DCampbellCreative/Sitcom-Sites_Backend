const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(express.json());

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri);

// app.get("/shows", (req, res) => {
//   shows
//     .find()
//     .then((shows) => {
//       res.status(201).json(shows);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// async function main() {
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
// const uri = process.env.ATLAS_URI;

// const client = new MongoClient(uri);

// try {
// Connect to the MongoDB cluster
// await client.connect();

// Make the appropriate DB calls
//     await listDatabases(client);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

// main().catch(console.error);

// async function listDatabases(client) {
//   databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// }

MongoClient.connect(uri, function (err, db) {
  if (err) throw err;
  var dbo = db.db("sitcom_sites");
  dbo
    .collection("shows")
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
