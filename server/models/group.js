const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    peoples: [{ type: ObjectId, ref: "user" }]
})


const Group = mongoose.modelNames("group", GroupSchema);
module.exports = { Group };