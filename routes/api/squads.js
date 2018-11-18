const express = require("express");
const router = express.Router();
const passport = require("passport");

//Players model
const Player = require("../../models/Player");
//Users model
const User = require("../../models/User");
//Squads model
const Squad = require("../../models/Squad");

// @route   GET api/squads/all
// @desc    Get all squads
// @access  Public
router.get("/all", (req, res) => {
  Squad.find()
    .sort({ date: -1 })
    .then(squads => res.json(squads))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/squads/
// @desc    Get all squads associated with user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find all squads owned by user
    const errors = {};
    Squad.find({ user: req.user.id })
      .then(squads => {
        if (!squads) {
          //error not being thrown, fix later
          errors.noSquads = "You have no saved squads";
          return res.status(404).json(errors);
        }
        res.json(squads);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/squads
// @desc    Create squads associated with user
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get fields for squad
    const squadFields = {};
    squadFields.user = req.user.id;
    if (req.body.name) squadFields.name = req.body.name;
    if (req.body.formation) squadFields.formation = req.body.formation;
    //add check to see if squad already exists, update if found
    new Squad(squadFields)
      .save()
      .then(squad => res.json(squad))
      .catch(err => res.json(err));
  }
);

// @route   POST api/squads/:squad_id
// @desc    Add player to squad
// @access  Private
router.post(
  "/:squad_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Squad.findById(req.params.squad_id)
      .then(squad => {
        if (req.user.id === squad.user) {
          return res.status(404).json({
            squadNotOwned: "This squad record belongs to another user"
          });
        }
        const squadPlayerFields = {};
        Player.findById(req.body.playerId)
          .then(player => {
            squadPlayerFields.player = player;
            if (req.body.position)
              squadPlayerFields.position = req.body.position;
            squad.players.push(squadPlayerFields);
            squad
              .save()
              .then(updatedSquad => res.json(updatedSquad))
              .catch(err => res.json(err));
          })
          .catch(err =>
            res.status(404).json({ noPlayer: "This player does not exist" })
          );
      })
      .catch(err =>
        res.status(404).json({ noSquad: "This squad does not exist" })
      );
  }
);

module.exports = router;
