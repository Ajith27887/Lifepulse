import 'dotenv/config';
import  mongoose  from "mongoose";

const uri = process.env.MONGODB_URL;

const connectdb = async () => {
	try {
		await mongoose.connect(uri, {});
		console.log(`Database connected: ${mongoose.connection.name}`);
	} catch (error) {
		console.error(`Database connection error: ${error.message}`);
		process.exit(1);
	}
};

export default connectdb;