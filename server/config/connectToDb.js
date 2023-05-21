
if (process.env.NODE_ENv != "production") {
    require("dotenv").config()
}


const mongoose = require("mongoose");




async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to DB")
        
    }catch {
        console.log(err)
    }
}

module.exports = connectToDb;