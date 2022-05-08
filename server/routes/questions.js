const router = require("express").Router();
const { Question } = require("../models/question");

router.post("/", async (req, res) => {
	const content = req.body.content;
    const content2 = req.body.content2;
    const answer = req.body.answer;
    const correctAnswer = req.body.correctAnswer;
    const type = req.body.type;
    const question = new Question({content: content,content2:content2, answer: answer,correctAnswer:correctAnswer, type: type});
    try {
        res.status(201).send({ message: "Pytanie dodane do bazy" });
        await question.save();   
        } catch (error) {
        console.error(error);
        console.log(req.body);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;
