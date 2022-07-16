// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (req, res) {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:YMD", (req, res) => {
  const timestamp = req.params.YMD;
  const date = new Date(timestamp);

  if (date.getTime() > 0) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else if (date.toDateString() && /^\d+$/.test(timestamp)) {
    let date = new Date(parseInt(timestamp));
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
