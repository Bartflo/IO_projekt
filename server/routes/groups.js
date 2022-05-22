const router = require("express").Router();
const {Group} = require("../models/group");
const {User} = require("../models/user");

router.post("/", async (req, res) => {
    const name = req.body.name;
    const peoples = req.body.peoples
    const group = new Group({name: name,peoples: peoples});
    try {
        res.status(201).send({ message: "Grupa dodana do bazy" });
        await group.save();
    } catch (error) {
        console.error(error);
        console.log(req.body);
        res.status(500).send({ message: "Internal Server Error" });
    }

});
router.get("/see", async (req, res) => {
    try {
        const group = await Group.find({}).populate({model: "user", path: "peoples"});
        res.send(group);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/seeuser", async (req, res) => {
    try {
        const questions = await User.find();
        res.send(questions);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



router.get("/:id", async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate({model: "user", path: "peoples"});
        if (!group) {
            return res.status(404).send({ message: "Test not found" });
        }
        res.send(group);
    } catch (error) {
        console.error(error);
        if (error.name === "CastError") {
            return res.status(404).send({ message: "Test not found" });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).send({ message: "Test not found" });
        }
        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(updatedGroup);
    } catch (error) {

        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).send({ message: "Group not found" });
        }
        await Group.findByIdAndDelete(req.params.id);
        res.send({ message: "Group deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



module.exports = router;