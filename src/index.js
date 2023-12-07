const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 3001;

mongoose
  .connect("mongodb+srv://root:1234@crypto.0uiet5b.mongodb.net")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(
  session({
    secret: "DKFJSDKFJDKFJDKSJFKDJFKSDFSDKFJDKSJ",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use("/api/v1/auth", authRouter);

app.use((req, res, next) => {
  if (req.session.user) next();
  else {
    res.send(401);
  }
});

// prefix to a modular router
app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/markets", marketsRoute);

app.listen(PORT, () => console.log(`running express server on port ${PORT}`));
