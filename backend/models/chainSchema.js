import mongoose from "mongoose";

const { Schema } = mongoose;

// This schema is identical to engineSchema, just for the chain
const chainSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true 
    },
    // 'startDue' will be the date the chain was lubed
    startDue: { 
        type: Date,
        required: true
    },
    // 'endDue' will be the date the next lube is due
    endDue: { 
        type: Date,
        required: true
    }
}, { timestamps: true }); 

const Chain = mongoose.model("Chain", chainSchema);

export default Chain;