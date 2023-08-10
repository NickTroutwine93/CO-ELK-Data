// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const pd = require('./parsingGMUData');
const mockData = require('./mock.json');

app.get("/api", (req, res) => {
  let success = req.query.success
  let hunters = req.query.hunters;
  console.log(mockData,success,hunters)
  var fakeResponse = pd.parsingGMUData(mockData,success,hunters);
  console.log(fakeResponse,"s",success,"h",hunters)
  res.json({ message: fakeResponse });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});