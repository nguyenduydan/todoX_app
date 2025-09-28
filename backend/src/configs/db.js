import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log(">> Connected to MongoDB successfully! <<");
    }catch(error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the process with failure
    }
}
