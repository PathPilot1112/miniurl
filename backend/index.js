import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import cors from "cors";

import connectDB from "./lib/db.js";
import miniModel from "./lib/schema.js";
import { Ratelimiter } from "./lib/ratelimiter.js";
import redis from "./lib/redis.js";
import { generateQRCode } from "./lib/qrcode.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

/* =======================
   MIDDLEWARE (ORDER MATTERS)
======================= */

// CORS (allow all – dev mode)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// JSON parser
app.use(express.json());

/* =======================
   DATABASE
======================= */

connectDB();

/* =======================
   CREATE SHORT URL
======================= */

app.post("/api/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    // 1️⃣ Validate input
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    let parsedURL;
    try {
      parsedURL = new URL(url);
    } catch {
      return res.status(400).json({ message: "Invalid URL" });
    }

    if (!["http:", "https:"].includes(parsedURL.protocol)) {
      return res.status(400).json({ message: "Invalid protocol" });
    }

    // 2️⃣ Rate limit
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const allowed = await Ratelimiter(ip);

    if (!allowed) {
      // ❗ CORRECT status code
      return res.status(429).json({ message: "Too many requests" });
    }

    // 3️⃣ Generate short code
    const code = crypto.randomBytes(4).toString("hex");

    const  tinyurl=`${process.env.BASE_URL}/${code}`
    const qrCode = await generateQRCode(tinyurl)

    // 4️⃣ Save to DB
    await miniModel.create({
      shortcode: code,
      originalurl: url,
      qrCode
    });

    // 5️⃣ Response
    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${code}`,
      qrCode:qrCode
    });
  } catch (error) {
    console.error("SHORTEN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   REDIRECT + CLICK COUNT
======================= */

app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    // 1️⃣ Try Redis cache FIRST
    const cachedURL = await redis.get(`url:${code}`);
    if (cachedURL) {
      // increment clicks (non-blocking)
      redis.incr(`clicks:${code}`);
      miniModel.updateOne(
        { shortcode: code },
        { $inc: { clicks: 1 } }
      ).exec();

      return res.redirect(302, cachedURL);
      
    }

    // 2️⃣ MongoDB fallback
    const urlDoc = await miniModel.findOne({ shortcode: code });
    if (!urlDoc) {
      return res.status(404).send("Short URL not found");
    }

    // 3️⃣ Cache URL
    await redis.set(`url:${code}`, urlDoc.originalurl, { EX: 3600 });

    // 4️⃣ Increment clicks
    redis.incr(`clicks:${code}`);
    await miniModel.updateOne(
      { shortcode: code },
      { $inc: { clicks: 1 } }
    );

    



    // 5️⃣ Redirect
    return res.redirect(302, urlDoc.originalurl);

    return res.status(201).send({clicks})

  } catch (error) {
    console.error("REDIRECT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/stats/:code", async (req, res) => {
  const { code } = req.params;

  const doc = await miniModel.findOne({ shortcode: code });
  if (!doc) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    shortCode: code,
    originalUrl: doc.originalurl,
    clicks: doc.clicks,
  });
});


/* =======================
   START SERVER
======================= */

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
