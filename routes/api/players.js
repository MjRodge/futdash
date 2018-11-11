const express = require("express");
const router = express.Router();
const passport = require("passport");

//Players model
const Player = require("../../models/Player");
//Users model
const User = require("../../models/User");

// @route   GET api/players/all
// @desc    Get all players
// @access  Public
router.get("/all", (req, res) => {
  Player.find()
    .sort({ date: -1 })
    .then(players => res.json(players))
    .catch(err => res.status(404).json(err));
});

// @route   POST api/players
// @desc    Create/Edit players associated with user
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get fields for player
    const playerFields = {};
    playerFields.user = req.user.id;
    if (req.body.name) playerFields.name = req.body.name;
    if (req.body.position) playerFields.position = req.body.position;
    //implement in future
    //if (req.body.cardType) playerFields.cardType = req.body.cardType;

    new Player(playerFields)
      .save()
      .then(player => res.json(player))
      .catch(err => res.json(err));
  }
);

// @route   GET api/players
// @desc    Get players associated with user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find all players owned by user
    //add populate here for game stats of players
    const errors = {};
    Player.find({ user: req.user.id })
      .then(players => {
        if (!players) {
          errors.noPlayers = "You have no saved players";
          return res.status(404).json(errors);
        }
        res.json(players);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
