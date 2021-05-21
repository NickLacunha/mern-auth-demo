const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session)

const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

const router = require("./routes");

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost/books",
  collection: "sessions"
});

store.on('error', (error) => {
  console.log(error);
});

app.use(session({
  secret: "This is a super secure secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
  store: store,
  resave: true,
  saveUninitialized: true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/books");

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
