const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const hour = 3600000;

const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("../config/dbConfig")

const router = express.Router();

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

router.use(cookieParser());

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.use(
  session({
    key: "userID",
    secret: "put suthisrisinlpa",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: hour },
  })
);



router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ status: true, user: req.session.user });
  } else {
    res.send({ status: false });
  }
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  console.log(username)
  const password = req.body.password;
  console.log(password)

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err, message: "An error occured. Please try again!" });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send({ user: result, status: true });
          } else {
            res.send({
              status: false,
              message: "Wrong username/password combination!",
            });
          }
        });
      } else {
        res.send({ message: "User doesn't exist", status: false });
      }
    }
  );
});

router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  console.log(username, password, firstName, lastName)


  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (firstName, lastName, username, password) VALUES (? ,?, ?, ?);",
      [firstName, lastName, username, hash],
      (err, result) => {
        if (err) {
          console.error(err);
          res.send({
            status: false,
            message: "An error occured. Please try again!",
          });
        }

        if (result) {
          res.send({ status: true, message: "User is successfully created!" });
        }
      }
    );
  });
});

module.exports = router;
