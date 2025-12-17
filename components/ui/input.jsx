"use client";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`
        flex-1 px-4 py-3 rounded-md
        bg-white/5 backdrop-blur-xl
        border border-white/10
        text-white placeholder:text-white/40
        focus:outline-none focus:ring-2 focus:ring-primary/50
        transition
        ${className}
      `}
      {...props}
    />
  );
}
