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
  cardType: { 
    type: String, 
    enum: [
      'bronze', 'silver', 'gold', 'totw', 'hero', 'toty', 'recordBreaker', 
      'stPaddy', 'motm', 'futtiesNom', 'proPlayer', 'tots', 'icons', 'futtiesWin', 
      'theJourneyIII', 'futChamps', 'otw', 'scream', 'movember', 'sbc', 'premiumSbc',
      'gotm', 'awardWinner', 'futBirthday', 'futmas', 'futChampionship', 'potmBundes', 
      'potmPrem', 'europaSbc', 'europaMotm', 'europaPtg', 'clCommon', 'clRare', 'clMotm', 
      'clPtg', 'flashbackSBC', 'futSwaps', 'totyNom', 'totsNom', 'europaTott', 'clSbc', 
      'clTott', 'europa',   
    ], 
    required: true, 
  },
  ovr: [
    {
      rating: { 
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  //array to hold statistics for each game a player completes
  gameStats: [
    {
      motm: {
        type: Boolean,
        default: false
      },
      matchRating: {
        type: Number
      },
      goals: {
        type: Number,
        default: 0
      },
      ownGoals: {
        type: Number,
        default: 0
      },
      assists: {
        type: Number,
        default: 0
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
        type: Number,
        default: 0
      },
      fitness: {
        type: Number
      },
      yellowCard: {
        type: Number,
        default: 0
      },
      redCard: {
        type: Number,
        default: 0
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
