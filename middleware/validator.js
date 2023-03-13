
const fs = require ("fs")

const validator=(req,res,next)=>{

    const method=req.method;
    const query=req.query;

    if(method==="patch" || method==="delete")
    {
  
       if(query.role!=="admin")
       {
        res.send("not allowed")
       } 
       else if(query.password!=="5567")
       {
        res.send("not allowed")
       }

       else if(query.role!=="admin" && query.password!=="5567")
       {
        next()
       }

    }
    else
    {
        next()
    }
    
    
}



module.exports={validator}