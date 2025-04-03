const mongoose = require('mongoose');
const debug = require("debug")("development:mongoose");
const config = require('config');
// In terminal write $env:DEBUG="development:*"
// $env:DEBUG="development:*

mongoose
.connect(`${config.get("MONGODB_URI")}/bagStore`)
.then(() => debug("Db connected"))
.catch((err)=>{console.log(err)})


module.exports = mongoose.connection;