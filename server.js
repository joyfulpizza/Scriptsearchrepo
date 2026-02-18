const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/search", async (req,res)=>{
  const query = req.query.q;
  if(!query) return res.json({error:"No query"});

  try{
    let results = [];

    // ScriptBlox
    try{
      const blox = await fetch(`https://scriptblox.com/api/script/search?q=${query}`);
      const bloxJson = await blox.json();
      results.push({
        source: "ScriptBlox",
        data: bloxJson.result?.scripts || []
      });
    }catch{}

    // RScripts
    try{
      const rs = await fetch(`https://rscripts.net/api/search?q=${query}`);
      const rsJson = await rs.json();
      results.push({
        source: "RScripts",
        data: rsJson || []
      });
    }catch{}

    // Haxhell
    try{
      const hx = await fetch(`https://haxhell.com/api/search?q=${query}`);
      const hxJson = await hx.json();
      results.push({
        source: "Haxhell",
        data: hxJson || []
      });
    }catch{}

    res.json({success:true,results});

  }catch{
    res.json({error:"Search failed"});
  }
});

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(3000,()=>{
  console.log("Website running");
});
