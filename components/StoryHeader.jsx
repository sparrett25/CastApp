// components/StoryHeader.jsx
import { useEffect, useState } from "react";

export default function StoryHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 32);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-40",
        "transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        "backdrop-blur-md bg-[#0b1117]/65 h-14"
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-3 h-14 flex items-center">
        <div className="text-sm tracking-wider font-semibold text-slate-200">CAST</div>
        {/* Compass removed from here; it now floats at app level */}
      </div>
    </header>
  );
}
