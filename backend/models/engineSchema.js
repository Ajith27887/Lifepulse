import mongoose from "mongoose";

const engineSchema = new mongoose.Schema({
	startDate : Date,
	expireMonth : Number,
})

export default mongoose.model('Engine', engineSchema);