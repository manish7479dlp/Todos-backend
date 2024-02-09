const mongoose = require("mongoose")

const connectDb = async () => {
   try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URL);
      console.log("Database Connected sucessfully")
   } catch (error) {
      console.log("Mongo DB connection failed.", error)
   } 
}

module.exports = connectDb;