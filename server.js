const express = require("express");
const mongoose = require("mongoose");
const ShortUrlModel=require('./models/shortUrl.js');
const cors=require("cors");



const app = express();
//

const corsOptionsDelegate = function (req, callback) {
    const allowlist = [
      `http://localhost:3000`,
      "http://127.0.0.1:3000",

    ];
    let corsOptions;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };

  app.use(cors(corsOptionsDelegate));
  app.use(express.json());


app.get("/", (req, res) => {
    res.json({
      message: "main page",
    });
  });
app.post("/shortUrls",(req,res)=>{


// if(!req.body){
//     res.status(400).json({
//         message: `url is mandatoy`,

//     })
// }

const newFull=new ShortUrlModel(req.body)
.save()
.then(f=>{
    console.log("newFull")
console.log(newFull)
    res.json({
        message: "create a fullUrl",
        data: f
    })
})
.catch(err=>{
    res.status(500).json({
        message: `Error---> ${err}`,

    })
})



})

const HTTP_PORT = process.env.PORT || 5000;
app.listen(HTTP_PORT,()=>{

    console.log(`app is listening to port ${HTTP_PORT}`);
mongoose.connect(`mongodb+srv://Ma661370:Ma661370@cluster0.as3i3.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>console.log(`connected to db`))
.catch(err=>console.log(err))
})