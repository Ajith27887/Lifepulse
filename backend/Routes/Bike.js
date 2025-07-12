import express from "express";
const app = express();

const Bike = () => {
	console.log("bike called");

	app.get("/", (req, res) => {
    res.json({ message: "Server is working!" });
});
	
	app.post("/bike", (req, res) => {
		res.json(["Engine Oil, Brake Fluid Check, Chain Lubrication, Chain Tension Check, Bike Wash, Tyre Air Pressure, Battery Health Check, Pollution Certificate Renewal,Insurance Renewal,License Validity Check"])
	})	
}

export default Bike


