const fs = require ("fs")

const logger=(req,res,next)=>{

    const start=new Date().getTime()

    const data=`router : ${req.method} | responce time : ${new Date().getTime()-start} \n`
   


    fs.appendFileSync("./log.txt",data)
    next()
    
}



module.exports={logger}