const { bool } = require("joi");
const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
	content: { type: String, required: true},
	answers: [{
		answer1: String,
		isCorrect: bool
	},
	{
		answer2: String,
		isCorrect:bool
	},
	
	{
		answer3: String,
		isCorrect:bool
		
	}
	]
	
	/*answer1: { type: Array, required: true},
	answer2: { type: Array, required: true},
	answer3: { type: String, required: true},
	*/
});

const Question = mongoose.model("question", questionSchema);

module.exports = { Question };
