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
    required: true,
    enum: [
      '3412', '3421', '3142', '343', '352', '41212', '41212-2', '4141', '4231', '4231-2', 
      '4222', '424', '4312', '4132', '4321', '433', '433-2', '433-3', '433-4', '433-5', 
      '4411', '4411-2', '442', '442-2', '451', '451-2', '5212', '5221', '532', '541'
    ] 
  },
  players: [
    {
      player: { type: Schema.Types.ObjectId, ref: "player" },
      position: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Squad = mongoose.model("squad", SquadSchema);
