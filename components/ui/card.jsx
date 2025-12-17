export function Card({ children, className = "" }) {
  return (
    <div
      className={`
        flex flex-col gap-6
        p-8 rounded-xl
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}
