const router = require("express").Router();
const { Question } = require("../models/question");

router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//get record by id
router.get("/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).send({ message: "Question not found" });
        }
        res.send(question);
    } catch (error) {
        console.error(error);
        if (error.name === "CastError") {
            return res.status(404).send({ message: "Question not found" });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});


//edit question by id
router.put("/update/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).send({ message: "Question not found" });
        }
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(updatedQuestion);
    } catch (error) {

        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



module.exports = router;
