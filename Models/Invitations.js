const Mongoose = require('mongoose');

const invitationSchema = new Mongoose.Schema({
    sender: {
        type: String,
        trim: true,
        required: true
    },
    groupName:{
        type: String,
        required: true
    },
    groupId: {
        type: Number,
        required: true
    }
})

const Invitation = Mongoose.model("Invitation",invitationSchema);
module.exports = Invitation;