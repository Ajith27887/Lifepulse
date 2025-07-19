import express from "express";
import cors from "cors";
import 'dotenv/config';
import dotenv from 'dotenv';
import Bike from "./Routes/Bike.js";
import connectdb from "./firebase.js";

const app = express();
app.use(express.json())
app.use(cors());
connectdb();
app.use("/bike", Bike);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.listen(8000, () => console.log("Server started at PORT 8000"));
