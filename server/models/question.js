const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
	content: { type: String, required: true},

	answer: [{type:String}],
	correctAnswer: {type:Number},
});

const Question = mongoose.model("question", questionSchema);

module.exports = { Question };
