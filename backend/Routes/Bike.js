import express from "express";
const router = express.Router();
import Engine from "../models/engineSchema.js"


router.get("/", (req, res) => {
	res.json({Name  : "Engine Oil"})
});

router.post("/",async (req, res) => {
	try {
		console.log("Request Body:", req.body);
		const { startDate, expireMonth } = req.body;

		const Day = new Date(startDate).getDate();
		
		const newengine = new Engine({
			startDate : new Date(startDate),
			expireMonth : expireMonth,
		}) 
		
		console.log("New Engine Object:", newengine);
		await newengine.save();
		res.status(201).json(newengine);
	}catch (err){
		res.status(500).json({ error: "Failed to save engine data" });
	}

})

// 	*Bike Category list
//  "Brake Fluid Check", "Chain Lubrication", "Chain Tension Check", "Bike Wash", "Tyre Air Pressure", "Battery Health Check", "Pollution Certificate", "Insurance Renewal","License Validity Check

export default router;
