require("dotenv").config();
const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { User } = require("./mongodb");
const { passport, customMiddleware } = require("./authorization");

const PORT = process.env.PORT || 3000;

app.use(bodyParse.json());
app.use(cors());
app.use(express.static(`${__dirname}/static`));

app.post("/api/user/sign-up", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET
    );
    res.json({
      email: user.email,
      username: user.username,
      _id: user._id,
      token,
    });
  } catch (error) {
    if (11000 === error.code || 11001 === error.code) {
      res.json({ error: "This email used" });
    } else {
      res.json({ error: error.toString() });
    }
  }
});

app.post("/api/user/sign-in", customMiddleware, (req, res) => {
  var token = jwt.sign(
    { email: req.user.email, _id: req.user._id },
    process.env.SECRET
  );
  res.json({
    email: req.user.email,
    username: req.user.username,
    _id: req.user._id,
    token,
  });
});

app.get(
  "/api/user/self",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`);
});
