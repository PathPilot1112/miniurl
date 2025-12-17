"use client";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const styles = {
    default:
      "bg-gradient-to-r from-indigo-500 to-pink-500 text-white",
    ghost:
      "bg-transparent text-primary hover:bg-white/5",
  };

  return (
    <button
      className={`
        px-5 py-3 rounded-md font-medium
        transition-all duration-200
        hover:scale-[1.02] active:scale-100
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
