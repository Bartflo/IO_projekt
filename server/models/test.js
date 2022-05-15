const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;

const TestSchema = new mongoose.Schema({
	name: { type: String, required: true},
	questions: [{type: String}]
	});


const Test = mongoose.model("test", TestSchema);
module.exports = { Test };
