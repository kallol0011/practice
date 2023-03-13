
const express = require ("express")
const fs=require("fs")
const Movierouter=express.Router()

// const dataFile="./data.json"


/// get/// 

Movierouter.get("/",(req,res)=>{
    // read data and parsed

    let data=JSON.parse(fs.readFileSync('./data.json',"utf-8"))
    res.send(data.movies)
})
Movierouter.get("/:id",(req,res)=>{
    const id=req.params.id
    let data=JSON.parse(fs.readFileSync('./data.json',"utf-8"))

    
    let singlemovie=data.movies.filter((el)=>{
        if(el.movie_id===Number(id))
        {
            return el
        }
    })


    // console.log(singlemovie)
    res.send(singlemovie)
})

/// post ///

Movierouter.post("/addmovies",(req,res)=>{
    
    //read and parsed
   
    const data = JSON.parse(fs.readFileSync("./data.json","utf-8"))

    // get new data 
    const new_data=req.body;


    // push in to the arr
     data.movies.push({movie_id:data.movies.length+1,...new_data})

     // reWrite entaire data (1st make data stringify then send)
     fs.writeFile("./data.json",JSON.stringify(data),(err)=>{
        if(err)
        {
            res.status(400).send("please fill the data")
        }
        else
        {
            res.status(200).send("data is added")

        }
     })
  
})


//// update //// (in patch update directly on main data file) (in put store updated data in a variable then reWrite it on datafile)


Movierouter.patch("/:id",(req,res)=>{
    // read and parsed
    const data = JSON.parse(fs.readFileSync("./data.json","utf-8"))
    
    // get id
    const id=req.params.id

    // find and update
  
    data.movies.map((el)=>{
        if(el.movie_id===Number(id))
        {
            el.name=req?.body?.name || el.name
            el.genre=req?.body?.genre || el.genre
            el.director=req?.body?.director  || el.director         
        }
    })
    // console.log(data)

    fs.writeFile("./data.json",JSON.stringify(data),(err)=>{
        if(err)
        {
            res.status(400).send("please fill the data")
        }
        else
        {
            res.status(200).send("data is update")

        }
     })

})

//////// update 2 ////////

Movierouter.put("/:id",(req,res)=>{

    const data = JSON.parse(fs.readFileSync("./data.json","utf-8"))

    const {id}=req.params

    // find and update
    const newDate=data.movies.map((el)=>{
        if(el.movie_id===Number(id))
        {
            return req.body
        }
        else
        {
            return el
        }
    })

    // change only previous movie data with new movie data

    data.movies=newDate

    // rewrite

    fs.writeFile("./data.json",JSON.stringify(data),(err)=>{
        if(err)
        {
            res.status(400).send("please fill the data")
        }
        else
        {
            res.status(200).send("data is update")

        }
     })


})


///// delete /////

Movierouter.delete("/:id",(req,res)=>{

    const data = JSON.parse(fs.readFileSync("./data.json","utf-8"))

    // get id
    const {id}=req.params
    
    // find and delete (filter)
    const newData=data.movies.filter((el)=>{
      return el.movie_id!==Number(id)
    })

    data.movies=newData

    fs.writeFile("./data.json",JSON.stringify(data),(err)=>{
        if(err)
        {
            res.status(400).send("please fill the data")
        }
        else
        {
            res.status(200).send("data is update")

        }
     })




})





















module.exports={Movierouter}


