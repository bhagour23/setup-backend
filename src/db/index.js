import mongoose from "mongoose";

const db=async()=>{
    try {
        let connectioninstant=await mongoose.connect(process.env.MONGO_URI)
        console.log("successful connection",connectioninstant.connection.host)
    } catch (error) {
        console.log("mongodb connection failed",error)
        process.exit(1)
    }
}

export default db;