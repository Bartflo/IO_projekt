const mongoose = require("mongoose");



const question2Schema = new mongoose.Schema({
	content: [{type:String}],
	points:{type:Number, default:1}
	//correctAnswer: {type:String},
});


const Question2 = mongoose.model("question2", question2Schema);
module.exports = { Question2 };