const mongoose = require("mongoose") 
mongoose.connect("mongodb://localhost:27017/UserDB")
.then(
   () => { console.log("connected succesfully".red.underline.bgGreen)}
)
.catch(
  (err) => { console.log(err)}
)