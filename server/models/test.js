const mongoose = require("mongoose");


const TestSchema = new mongoose.Schema({
	name: { type: String, required: true},
	questions: [{type: mongoose.Schema.Types.ObjectId, ref: "question"}],
    questions2: [{type: mongoose.Schema.Types.ObjectId, ref: "question2"}],
    questions3: [{type: mongoose.Schema.Types.ObjectId, ref: "question3"}],

});


const Test = mongoose.model("test", TestSchema);
module.exports = { Test };
