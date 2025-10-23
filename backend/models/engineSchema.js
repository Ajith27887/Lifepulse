import mongoose from "mongoose";

const { Schema } = mongoose;

const engineSchema = new Schema({
    // Add this line
    userId: {
        type: String,
        required: true,
        index: true // Add index for faster lookups by userId
    },
    // These are the new field names
    startDue: { // This is the date service was *performed*
        type: Date,
        required: true
    },
    endDue: { // This is the date service is *next due*
        type: Date,
        required: true
    }
}, { timestamps: true }); 

const Engine = mongoose.model("Engine", engineSchema);

export default Engine;