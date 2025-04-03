const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const router = express.Router();

router.get("/", (req,res)=>{
    let error = req.flash("error")
    res.render("index", {error, loggedin: false});
})

router.get("/shop", isLoggedIn, async (req,res)=>{
    let products = await productModel.find();
    // console.log(products)
    // niche addtocard wale route se jo flash msg ayegi wo yha variabe me lekr shop page ko send kr denge
    let success = req.flash("success")
    res.render("shop", {products, success})
})


router.get("/addtocart/:productid", isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid)
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop")
})


router.get("/cart", isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("cart");

    const bill = (Number(user.cart[0].price) + 20) - Number(user.cart[0].discount);
    res.render("cart",{user, bill})
})


module.exports = router;