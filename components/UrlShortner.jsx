"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!url) return;

    setLoading(true);
    setShortUrl("");

    try {
      const res = await fetch("http://localhost:3001/api/shorten", {
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
  };

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
          </div>
        )}
      </div>
    </Card>
  );
}
