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
// @desc    Create players associated with user
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

    //add check to see if player already exists, update if found
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
          //error not being thrown, fix later
          errors.noPlayers = "You have no saved players";
          return res.status(404).json(errors);
        }
        res.json(players);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/players/:player_id
// @desc    Get single player associated with user
// @access  Private
router.get(
  "/:player_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Player.findById(req.params.player_id)
      .then(player => {
        if (req.user.id !== player.user) {
          return res
            .status(404)
            .json({
              playerNotOwned: "This player record belongs to another user"
            });
        }
        res.json(player);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/players/stats/:player_id
// @desc    Record game stats of a player
// @access  Private
router.post(
  "/stats/:player_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Player.findById(req.params.player_id)
      .then(player => {
        const stats = {
          motm: req.body.motm,
          matchRating: req.body.matchRating,
          goals: req.body.goals,
          ownGoals: req.body.ownGoals,
          assists: req.body.assists,
          shots: req.body.shots,
          totalShots: req.body.totalShots,
          passes: req.body.passes,
          totalPasses: req.body.totalPasses,
          dribbles: req.body.dribbles,
          totalDribbles: req.body.totalDribbles,
          crosses: req.body.crosses,
          totalCrosses: req.body.totalCrosses,
          tackles: req.body.tackles,
          totalTackles: req.body.totalTackles,
          saves: req.body.saves,
          fitness: req.body.fitness,
          yellowCard: req.body.yellowCard,
          redCard: req.body.redCard
        };
        //add players stats to start of array
        player.gameStats.unshift(stats);
        player
          .save()
          .then(player => res.json(player))
          .catch(err => res.json(err));
      })
      .catch(err =>
        res.status(404).json({ playerNotFound: "Player not found" })
      );
  }
);

module.exports = router;
