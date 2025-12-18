"use client";

import UrlShortener from "../components/UrlShortner";
import HyperSpeed from "../components/HyperSpeed";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Background Effect */}
      <HyperSpeed />

      {/* Foreground UI */}
      <div className="absolute z-10 px-4 flex flex-col gap-10 justify-center items-center ">
        <UrlShortener />
        <Link href='/analytics'><Button>Analytics</Button></Link>
      </div>
    </main>
  );
}
