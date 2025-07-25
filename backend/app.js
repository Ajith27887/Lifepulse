import express from "express";
import cors from "cors";
import Bike from "./Routes/Bike.js";
import connectdb from "./db/mongoConnect.js";
import 'dotenv/config';

const app = express();

app.use(express.json())

app.use(cors({

  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
  
}));

app.use("/bike", Bike); //Route

connectdb().then(() => {
	app.listen(process.env.PORT, () => console.log(`Server started at PORT ${process.env.PORT}`));
})
