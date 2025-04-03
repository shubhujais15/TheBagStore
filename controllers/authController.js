const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken')
const userModel = require("../models/user-model")

const registerUser = async function(req,res){
    try{
        let {fullname, email, password } = req.body;
    
        let user = await userModel.findOne({email: email})
        if(user) return res.status(401).send("You have already an account please login")

        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password, salt, async (err,hash)=>{
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    }) 
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/");
                }
            })
        });
    } catch (err){
        res.send(err.message);
    }
    

}

const loginUser = async(req,res)=>{
    let {email,password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or password is incorrect")
    
    bcrypt.compare(password, user.password, (err,result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop")
        }
        else{
            res.send("Email or password is incorrect")
        }
    })
}

const logout = async(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}

module.exports = {registerUser, loginUser, logout};