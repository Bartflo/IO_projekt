const router = require("express").Router();
const { Test } = require("../models/test");

router.post("/", async (req, res) => {
	const name = req.body.name;
    const test = new Test({name: name});
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
