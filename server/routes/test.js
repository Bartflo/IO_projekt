const router = require("express").Router();
const { Test } = require("../models/test");

router.post("/", async (req, res) => {
	
    
    const name = req.body.name;
    const questions = req.body.questions;
    const questions2 = req.body.questions2;
    const questions3 = req.body.questions3;
    const test = new Test({name: name, questions: questions, questions2: questions2, questions3: questions3});
    try {
        
        res.status(201).send({ message: "Test dodany do bazy" });
        await test.save();
           
        } catch (error) {
        console.error(error);
        console.log(req.body);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;
