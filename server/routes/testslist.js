const router = require("express").Router();
const { Test } = require("../models/test");

router.get("/", async (req, res) => {
    try {
        const test = await Test.find();
        res.send(test);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//get record by id
router.get("/:id", async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
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

//edit question by id
router.put("/update/:id", async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).send({ message: "Test not found" });
        }
        const updatedTest = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(updatedTest);
    } catch (error) {

        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).send({ message: "Test not found" });
        }
        await Test.findByIdAndDelete(req.params.id);
        res.send({ message: "Test deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
