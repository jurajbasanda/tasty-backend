import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host} ✅`.green)
    }
    catch (error) {
        console.log(`Error: ${error.messege} 🔴`.red)
        process.exit(1)
    }
}
export default connectDB

