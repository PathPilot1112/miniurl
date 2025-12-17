"use client";

import UrlShortener from "../components/UrlShortner";
import HyperSpeed from "../components/HyperSpeed";

export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Background Effect */}
      <HyperSpeed />

      {/* Foreground UI */}
      <div className="relative z-10 px-4">
        <UrlShortener />
      </div>
    </main>
  );
}
