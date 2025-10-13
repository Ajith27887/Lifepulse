import express from "express";
import cors from "cors";
import Bike from "./Routes/Bike.js";
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

app.use("/bike", Bike); //Route

connectdb().then(() => {
	app.listen(process.env.PORT, () => console.log(`Server started at PORT ${process.env.PORT}`));
})
