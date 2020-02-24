const Mongoose = require('mongoose');

const messageSchema = new Mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Message= Mongoose.model("Message", messageSchema);
module.exports = Message;