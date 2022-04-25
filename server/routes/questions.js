const router = require("express").Router();
const { Question } = require("../models/question");

router.post("/", async (req, res) => {
	const content = req.body.content;
    const content2 = req.body.content2;
    const answer = req.body.answer;
    const correctAnswer1 = req.body.correctAnswer1;
    const correctAnswer2 = req.body.correctAnswer2;
    const question = new Question({content: content,content2:content2, answer: answer,correctAnswer1:correctAnswer1,correctAnswer2:correctAnswer2});
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
