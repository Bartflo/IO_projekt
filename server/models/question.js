const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
	content: { type: String},
	content2: [{type: String}],
	answer: [{type:String}],
	correctAnswer: [{type:Number}],
	type: {type: Number},
	points:{type:Number, default:1},

});


const Question = mongoose.model("question", questionSchema);
module.exports = { Question };
