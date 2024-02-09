const mongoose = require("mongoose")
const {DB_NAME } = require("../constant")

const connectDb = async () => {
   try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URL + `/${DB_NAME}`);
      console.log("Database Connected sucessfully")
   } catch (error) {
      console.log("Mongo DB connection failed.", error)
   } 
}

module.exports = connectDb;