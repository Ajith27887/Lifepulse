import express from "express";
import Chain from "../models/chainSchema.js"; 

const router = express.Router();

// POST a new chain lube record
router.post('/', async (req, res) => {
    try {
        const { startDue, endDue, userId } = req.body;

        if (!userId || !startDue || !endDue) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newLubeRecord = new Chain({ // <-- Use Chain model
            userId,
            startDue,
            endDue
        });

        await newLubeRecord.save();
        res.status(201).json(newLubeRecord); 

    } catch (error) {
        console.error("Error saving chain data:", error);
        res.status(500).json({ error: "Failed to save lube record" });
    }
});

// GET the *latest* lube record for a *specific user*
router.get('/latest/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const latestRecord = await Chain.findOne({ userId: userId }) // <-- Use Chain model
                                         .sort({ endDue: -1 }); 

        if (!latestRecord) {
            return res.status(200).json(null); 
        }
        res.status(200).json(latestRecord);

    } catch (error) {
        console.error("Error fetching latest chain data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// DELETE all chain records for a specific user
router.delete('/clear/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const deleteResult = await Chain.deleteMany({ userId: userId }); // <-- Use Chain model

        res.status(200).json({ message: `Data cleared. ${deleteResult.deletedCount} record(s) deleted.` });

    } catch (error) {
        console.error("Error clearing chain data:", error);
        res.status(500).json({ error: "Failed to clear data" });
    }
});

export default router;