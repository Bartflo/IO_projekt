const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

const StatsSchema = new mongoose.Schema({
    test: { type: ObjectId, ref: "test" },
    person: { type: ObjectId, ref: "user" },
    points: { type: Number}

})


const Stats = mongoose.model("stats", StatsSchema);
module.exports = { Stats };