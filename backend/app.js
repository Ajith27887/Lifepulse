import express from "express";
import cors from "cors";
import Bike from "./Routes/Bike.js";

const app = express();
app.use(express.json())
app.use(cors());
Bike();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.listen(8000, () => console.log("Server started at PORT 8000"));