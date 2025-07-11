import mongoose from "mongoose";
import logger from "thirtyfour";
const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.success("Connected to Database successfully");
  } catch (error) {
    logger.error(`Error in connecting to database: ${error}`);
    process.exit(1);
  }
};

export default databaseConnection;
