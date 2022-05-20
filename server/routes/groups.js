const router = require("express").Router();
const {Group} = require("../models/group");
const {User} = require("../models/user");

router.post("/", async (req, res) => {
    const name = req.body.name;
    const peoples = req.body.peoples;
    const group = new Group({name: name, peoples: peoples});
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



module.exports = router;