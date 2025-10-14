import mongoose from "mongoose";

const engineSchema = new mongoose.Schema({
	startDue : Date,
})

export default mongoose.model('Engine', engineSchema);