const mongoose = require("mongoose");



const question3Schema = new mongoose.Schema({
	content: [{type:String}],
	correctAnswer : {Type:String},
	points:{type:Number, default:1}
    
});


const Question3 = mongoose.model("question3", question3Schema);
module.exports = { Question3 };