import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); //It loads the varible from .env file into process.env
//console.log("env values",process.env);

const dbUsername = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbClustername = process.env.DB_CLUSTER_NAME || "127.0.0.1:27017";
const dbName = process.env.DB_NAME || "assign-mentor-student";

//const localUri="mongodb://127.0.0.1:27017/assign-mentor-student";

const cloudUri=`mongodb+srv://${dbUsername}:${dbPassword}@${dbClustername}/${dbName}?retryWrites=true&w=majority`

const connectToDb = async() => {
    try {
        await mongoose.connect(cloudUri);
        console.log("Connected to MongoDB");
      } catch (err) {
        console.log("Error connecting to MongoDB", err);
        process.exit(1);
      }
};

export default connectToDb;



//Username - shafeerazahur3

//pwd - gLRqCHKUX26n1SXR

//mongodb+srv://shafeerazahur3:<password>@cluster0.8pqyyib.mongodb.net/?retryWrites=true&w=majority