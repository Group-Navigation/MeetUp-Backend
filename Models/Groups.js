const Mongoose = require('mongoose');

const GroupSchema = new Mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    }
})

const Group = Mongoose.model("Group", GroupSchema);
module.exports = Group;

