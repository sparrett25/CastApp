import { useId } from "react";

export default function TileFilter({ value, onChange, placeholder="Search…" }) {
  const id = useId();
  return (
    <div className="mb-3">
      <label htmlFor={id} className="sr-only">Search</label>
      <input
        id={id}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2
                   text-white/90 placeholder-white/45 outline-none
                   focus:ring-2 focus:ring-sky-400/40 focus:border-white/20"
      />
    </div>
  );
}
