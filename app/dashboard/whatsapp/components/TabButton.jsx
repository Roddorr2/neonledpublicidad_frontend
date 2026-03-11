export function TabButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative px-2 pb-3 pt-2 text-sm font-semibold transition",
        active
          ? "text-cyan-600 dark:text-cyan-400"
          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
      ].join(" ")}
      type="button"
    >
      {label}
      <span
        className={[
          "absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full transition",
          active ? "bg-cyan-500 dark:bg-cyan-400" : "bg-transparent",
        ].join(" ")}
      />
    </button>
  );
}

export function Card({ children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-700 dark:bg-slate-800/90">
      {children}
    </div>
  );
}

export function CardTitle({ children }) {
  return <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">{children}</h2>;
}

export function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-slate-500 dark:text-slate-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 16V6" />
      <path d="M8 10l4-4 4 4" />
      <path d="M20 16.5a4.5 4.5 0 0 0-1.9-8.7A6 6 0 0 0 6.2 7.2 4.5 4.5 0 0 0 4 16.5" />
    </svg>
  );
}

