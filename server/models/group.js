const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    peoples: [{ type: ObjectId, ref: "user" }]
})


const Group = mongoose.model("group", GroupSchema);
module.exports = { Group };