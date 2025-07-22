import express from "express";
const router = express.Router();
import Engine from "../models/engineSchema.js"


router.get("/", (req, res) => {
	res.json(["Engine Oil"])
});

router.post("/",async (req, res) => {
	try {
		const { startDate, expireMonth } = req.body;

		const newengine = new Engine({
			startDate : new Date(startDate),
			expireMonth : expireMonth,
		}) 

		await newengine.save();

		res.send("201").json(newengine);

	}catch (err){
		console.log(err);
	}

})

// 	*Bike Category list
//  "Brake Fluid Check", "Chain Lubrication", "Chain Tension Check", "Bike Wash", "Tyre Air Pressure", "Battery Health Check", "Pollution Certificate", "Insurance Renewal","License Validity Check

export default router;
