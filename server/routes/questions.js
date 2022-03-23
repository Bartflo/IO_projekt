const router = require("express").Router();
const { Question } = require("../models/question");

router.post("/", async (req, res) => {
	const content = req.body.content;
    const question = new Question({content: content});
    try {
		/*const question = await Question.findOne({ content: req.body.content });
		if (question){
            return res
            .status(409)
            .send({ message: "Pytanie istnieje" }); 
        }
		*/
		//let question = new Question(req.body.content);
        
        res.status(201).send({ message: "Pytanie dodane do bazy" });
        await question.save();
           
        } catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;
