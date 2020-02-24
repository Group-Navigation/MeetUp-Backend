const Mongoose = require("mongoose");

const userSchema= new Mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
    },
    long: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
});

const User = Mongoose.model("User",userSchema);
module.exports= User;
