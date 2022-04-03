const router = require("express").Router();
const { Question3 } = require("../models/question3");
let question = require("../models/question3");
router.post("/", async (req, res) => {
	const content = req.body.content;
    //const correctAnswer = req.body.correctAnswer;
    const question3 = new Question3({content: content,/*correctAnswer:correctAnswer*/});
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
        await question3.save();
           
        } catch (error) {
        console.error(error);
        console.log(req.body);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

    router.get("/", async (req, res) => {
        try {
            const questions3 = await Question3.find();
            res.send(questions3);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });
    

module.exports = router;