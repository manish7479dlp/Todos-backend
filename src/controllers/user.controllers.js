const User = require("../models/user.models")


//create user
const createUser = async (req , res) => {
    try {
        const [firstName , lastName , password , userName , email] = req.body
        
        if(!firstName) {
            res.json({status: false , message: "firstName required"})
        } else if(!lastName) {
            res.json({status: false , message: "lastName required"})
        } else if(!password) {
            res.json({status: false , message: "password required"})
        } else if(!email) {
            res.json({status: false , message: "email required"})
        }

        const isExistingUser = await find({userName})

        if(isExistingUser) {
            res.json({status: false , message: "userName already exits"})
        }

        const user = await new User.create({
            firstName,
            lastName,
            password,
            userName,
            email,
        })

        if(user) {
            res.status(201).json({status:true , message: "user created sucessfully"})
        } 


    } catch (error) {
        console.log("Error",error)
    }
}

