
const experss=require("express")
const fs=require ("fs")

const app=experss()

app.use(experss.json())

const {Movierouter}=require("./movie.router")
const {logger}=require("./middleware/logger")
const {validator}=require("./middleware/validator")




app.use(logger)
app.use(validator)
app.use("/movies",Movierouter)




app.listen(4500,()=>{
    console.log("server is runing on 4500")
})