const express=require("express")
const userRoutes = require("./user")
const productRoutes = require("./product")
const app=express()
app.use("/users", userRoutes)
app.use("/products", productRoutes)
module.exports=router