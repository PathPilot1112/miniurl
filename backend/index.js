import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import crypto from "crypto";
import miniModel from "./lib/schema.js"
import { Ratelimiter } from "./lib/ratelimiter.js";
import redis from "./lib/redis.js";
dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

connectDB();

app.post("/api/shorten", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Provide a valid URL" });
  }

  let parsedURL;
  try {
    parsedURL = new URL(url);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Provide a valid URL" });
  }

  if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
    return res.status(400).json({ message: "Invalid protocol" });
  }

  const code = crypto.randomBytes(4).toString("hex");


  const ip = req.ip

  const allowed = await Ratelimiter(ip)

  if(!allowed){
    return res.status(402).json({message:'Too many requests'})
  }

  const newURL = await miniModel.create({
    shortcode: code,
    originalurl: url,
  });

  
  if (newURL) {
    return res.status(200).json({ shortcode: `${process.env.BASE_URL}/${code}` });
  }


  
});


app.get('/:code',async (req,res)=>{
    try {
        const { code } = req.params
        await redis.incr(`clicks:${code}`);

        const cachedURL = await redis.get(code);
        if(cachedURL){
            return  res.redirect(302,cachedURL)
        }

        const urldoc = await miniModel.findOne({shortcode:code})
        if(!urldoc){
            return res.status(404).send("Short URL not found");
        }

        await redis.set(code, urldoc.originalurl,{
            EX:3600,
        })

        return res.redirect(302,urldoc.originalurl)
        

        
    } catch (error) {
        console.error(error)
        return res.status(400).json({message:'Server error'})
        
    }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
