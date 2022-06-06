const router = require("express").Router();
const { Test } = require("../models/test");
const {Questions} = require("../models/question");
const {Group} = require("../models/group");

router.get("/:id", async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).populate({model: "question", path: "questions"}).populate({model: "group", path: "group"});
        if (!test) {
            return res.status(404).send({ message: "Test not found" });
        }
        res.send(test);
    } catch (error) {
        console.error(error);
        if (error.name === "CastError") {
            return res.status(404).send({ message: "Test not found" });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});




module.exports = router;
