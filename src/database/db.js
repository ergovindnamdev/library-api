const mongoose = require("mongoose");

const username = encodeURIComponent("ergovindnamdev");
const password = encodeURIComponent("xtSBBn5WYWwaWKKe");
const cluster = "cluster0.ai0hafv.mongodb.net";
const collection = 'library';
const URL = `mongodb+srv://${username}:${password}@${cluster}/${collection}?retryWrites=true&w=majority`;

//const URL = `mongodb://localhost:27017/${collection}`;

const DatabaseConn = async () => {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 5 seconds (adjust as needed)

  });
  console.log("db connect");

  //mongodb.module("User").findOne();
};
0;

module.exports = DatabaseConn;
