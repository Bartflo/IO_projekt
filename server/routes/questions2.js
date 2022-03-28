const router = require("express").Router();
const { Question2 } = require("../models/question2");

router.post("/", async (req, res) => {
	const content = req.body.content;
    //const correctAnswer = req.body.correctAnswer;
    const question2 = new Question2({content: content,/*correctAnswer:correctAnswer*/});
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
        await question2.save();
           
        } catch (error) {
        console.error(error);
        console.log(req.body);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;