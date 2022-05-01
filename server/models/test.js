const mongoose = require("mongoose");


const TestSchema = new mongoose.Schema({
	name: { type: String, required: true},
	questions: [{type: mongoose.Schema.Types.ObjectId, ref: "question"}]
	});


const Test = mongoose.model("test", TestSchema);
module.exports = { Test };
