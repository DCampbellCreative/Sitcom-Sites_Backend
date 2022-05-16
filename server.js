// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 3500;
// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection
// const dbo = require("./db/connection");

// app.listen(port, () => {
// perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });

// require("dotenv").config({ path: "./config.env" });

// async function main() {
//   const MongoClient = require("mongodb").MongoClient;
//   const uri = process.env.ATLAS_URI;
//   const client = new MongoClient(uri, { useNewUrlParser: true });
//   client.connect((err) => {
//     const collection = client.db("sitcom_sites").collection("shows");
//     // perform actions on the collection object
//     client.close();
//   });
// }

// main().catch(console.error);

// async function findListings(client, resultsLimit) {
//   const cursor = client
//     .db('sitcom_sites')
//     .collection('shows')
//     .find()
//     .limit(resultsLimit);

//   const results = await cursor.toArray();
//   if (results.length > 0) {
//     console.log(`Found ${results.length}`);
//     results.forEach((result, i) => {

//       console.log();
//       console.log(`${i + 1}. name: ${result.name}`);
//       console.log(`   _id: ${result._id}`);
//       console.log(`   bedrooms: ${result.bedrooms}`);
//       console.log(`   bathrooms: ${result.bathrooms}`);
//       console.log(
//         `   most recent review date: ${new Date(
//           result.last_review
//         ).toDateString()}`
//       );
//     });
//   }
// }
