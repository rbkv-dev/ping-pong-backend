require("dotenv").config();
const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("./mongodb");
const { passport, customMiddleware } = require("./authorization");

const PORT = process.env.PORT || 3000;

app.use(bodyParse.json());
app.use(cors());
app.use(express.static(`${__dirname}/static`));

app.post("/api/user/sign-up", async (req, res, next) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      if (err) return next(err);
      try {
        const user = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });

        const token = await jwt.sign(
          { email: user.email, _id: user._id },
          process.env.SECRET
        );

        res.json({
          token,
        });
      } catch (error) {
        console.log("error", error);
        res.json({ message: `This ${Object.keys(error.keyPattern)[0]} used` });
      }
    });
  });
});

app.post("/api/user/sign-in", customMiddleware, (req, res) => {
  var token = jwt.sign(
    { email: req.user.email, _id: req.user._id },
    process.env.SECRET
  );
  res.json({
    token,
  });
});

app.get(
  "/api/user/self",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user._id);
  }
);

app.post("/api/user/score", async (req, res) => {
  let _res = await User.findOne({ _id: req.body._id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ score: result.score });
    }
  });
});

app.get("/api/get-score", async (req, res) => {
  await User.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      _res = result.map((e) => ({ username: e.username, score: e.score }));
      res.send(_res);
    }
  });
});

app.put("/api/put-score", async (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body._id },
    { score: req.body.score },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`);
});
