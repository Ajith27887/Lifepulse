import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.json(["Engine Oil"])
});

// 	*Bike Category list
//  "Brake Fluid Check", "Chain Lubrication", "Chain Tension Check", "Bike Wash", "Tyre Air Pressure", "Battery Health Check", "Pollution Certificate", "Insurance Renewal","License Validity Check


export default router;
