
const colors = require("colors")
console.log("hey vedant".cyan.underline.bold)

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const os = require("os")
const bcrypt = require("bcryptjs")
const PORT = process.env.PORT || 3400
const morgan = require("morgan")
require("C:/Users/vedan/Desktop/todo app using mongo db and node.js/connection.js")
const User = require("C:/Users/vedan/Desktop/todo app using mongo db and node.js/Models/User.js")
const { get } = require("http")
/* require all the stuff */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.json("HEllo")
})

app.post("/api/auth/register", async (req, res) => {
    // get the name, email, pass, cpass 
    const name = req.body.name
    const email = req.body.email
    const pass = req.body.password
    const cpass = req.body.cpassword
    const getTheDoc = await User.findOne({ email: email })
    if (getTheDoc != null) {
        res.status(400).json({
            msg: "User already exists"
        })
    } else {

        // register it 
        if (pass === cpass) {
            const doc1 = new User({
                name: name,
                email: email,
                password: pass
            })

             // hash the password using the middle ware! 

            const result = await doc1.save()
            res.status(200).json({
                msg: "Created succesfully!!"
            })

        } else {
            res.status(400).json({
                msg: "invalid credentials! Please try again!! "
            })
        }
    }

})

app.post("/api/auth/login", async(req, res) => {
     const email = req.body.email 
     const password = req.body.password 
      const getDoc = await User.findOne({email:email}) 
      if( getDoc != null ){
          const isPassSame = await bcrypt.compare( password , getDoc.password )
          if( isPassSame ){
              res.status(200).json({
                success : "true",
                msg : "User succesfully logged in",
                User : getDoc
              })
          }else{
              res.status(404).send({
                success : false ,
                msg : "invalid credential, try again!"
              })
          }
      }else{
        res.status(400).json({
            success : false ,
            msg : "Please sign up, Account is missing! "
        })
      }
})

app.listen(PORT, () => {
    console.log("Listening at your port".red.underline.bgYellow)
})