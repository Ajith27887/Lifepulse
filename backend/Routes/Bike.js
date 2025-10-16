import express from "express";
const router = express.Router();
import Engine from "../models/engineSchema.js"


router.get("/", (req, res) => {
	res.json({Name  : "Engine Oil"})
});

router.post("/",async (req, res) => {
	try {
        // Add more detailed logging
        console.log("Full Request Body:", req.body);
        console.log("Content-Type:", req.headers['content-type']);		const { DueDate } = req.body;
		console.log(DueDate,"DueDate");

		if (!DueDate) {
			
            return res.status(400).json({ error: "DueDate is required" });
        }
		
		const newengine = new Engine({
			startDue : new Date(DueDate),
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
