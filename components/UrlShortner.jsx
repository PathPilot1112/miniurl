"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const shortenUrl = async () => {
    if (!url) return;

    setLoading(true);
    setShortUrl("");
    

   

    try {
      const res = await fetch('https://miniurl-2maq.onrender.com/api/shorten', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setShortUrl(data.shortUrl);
      
      
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }


  async function showqr(){
    if(!shortenUrl){
      setLoading2(true);
      setQrcode("");
    }
    try {
      const res = await fetch('https://miniurl-2maq.onrender.com/api/shorten', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const dataqr = await res.json();
      setQrcode(dataqr.qrCode);
      
      
    } catch (err) {
      console.error(err);
    }

    setLoading2(false);
  
  }

  return (
    <Card className="w-full max-w-xl backdrop-blur-xl bg-white/5 border border-white/10">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-center">
          Mini<span className="text-primary">URL</span>
        </h1>

        <p className="text-center text-muted-foreground">
          Shorten links instantly. Fast. Secure. Clean.
        </p>

        <div className="flex gap-2">
          <Input
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button onClick={shortenUrl} disabled={loading}>
            {loading ? "..." : "Shorten"}
          </Button>
        </div>

        {shortUrl && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Your short link</p>
            <a
              href={shortUrl}
              target="_blank"
              className="block mt-1 text-lg font-mono text-primary hover:underline"
            >
              {shortUrl}
            </a>
            <Button className="mt-3" disabled={loading2} onClick={showqr}>{loading2?"..." : "Generate QR"}</Button>
            {qrcode && (
              <Image src={qrcode} alt="yoururl" height={130} width={130} className="flex mt-5 ml-25"/>)}
              <Button className="mt-3 text-white" disabled={loading2} onClick={showqr} ><a href={qrcode} download = 'qrCode.png' className="text-white">{loading2?"..." : "Download"}</a></Button>
          </div>
        )}
      </div>
        
    </Card>
  );
}
