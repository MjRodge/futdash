const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SquadSchema = new Schema({
  //links the team to registered user
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  formation: {
    type: String,
    required: true
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Squad = mongoose.model("squad", SquadSchema);
