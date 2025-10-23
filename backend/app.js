import express from "express";
import cors from "cors";
import Bike from "./Routes/Bike.js"; // This imports your route
import Chain from "./Routes/Chain.js"; // <-- 1. Import the new Chain route
import connectdb from "./db/mongoConnect.js";
import 'dotenv/config';

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // no slash
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json())

app.use("/bike", Bike); // This uses your bike route
app.use("/chain", Chain); // <-- 2. Use the new Chain route

// This connects to your database and starts the server
connectdb().then(() => {
	app.listen(process.env.PORT, () => console.log(`Server started at PORT ${process.env.PORT}`));
})