const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create player schema
const PlayerSchema = new Schema({
  //links the player to registered user
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  //array to hold statistics for each game a player completes
  gameStats: [
    {
      motm: {
        type: Boolean
      },
      matchRating: {
        type: Number
      },
      goals: {
        type: Number
      },
      ownGoals: {
        type: Number
      },
      assists: {
        type: Number
      },
      shots: {
        type: Number
      },
      totalShots: {
        type: Number
      },
      passes: {
        type: Number
      },
      totalPasses: {
        type: Number
      },
      dribbles: {
        type: Number
      },
      totalDribbles: {
        type: Number
      },
      crosses: {
        type: Number
      },
      totalCrosses: {
        type: Number
      },
      tackles: {
        type: Number
      },
      totalTackles: {
        type: Number
      },
      saves: {
        type: Number
      },
      fitness: {
        type: Number
      },
      yellowCard: {
        type: Number
      },
      redCard: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Player = mongoose.model("player", PlayerSchema);
