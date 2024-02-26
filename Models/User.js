const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name: String,
    email : String,
    password : String
})


//middle ware chala dunga! 
userSchema.pre( "save",  async function(){
    try{
        this.password = await bcrypt.hash(this.password,10) 
    }catch(err) {
        console.log(err) 
    }
} )

const User = new mongoose.model("User", userSchema )
module.exports = User 