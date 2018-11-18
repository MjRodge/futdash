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

module.exports = router;
