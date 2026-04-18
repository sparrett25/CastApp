/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./**/*.{js,jsx,ts,tsx}",        // ← catch all app files
    // OR if you prefer to be explicit:
    // "./components/**/*.{js,jsx,ts,tsx}",
    // "./layouts/**/*.{js,jsx,ts,tsx}",
    // "./pages/**/*.{js,jsx,ts,tsx}",
    // "./ui/**/*.{js,jsx,ts,tsx}",
  ],
  // optional: keep a safelist while you iterate
  safelist: [
    "fixed","inset-auto","z-[2147483000]",
    "bottom-4","right-4","md:bottom-6","md:right-6",
    "w-14","h-14","md:w-16","md:h-16","rounded-full",
    "bg-amber-400/90","text-slate-900","border","border-white/20",
    "backdrop-blur","shadow-lg","hover:bg-amber-400","transition",
    "pointer-events-auto"
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#E7D9C6",
        parchmentDeep: "#CBBCA7",
        river: "#5C7D8A",
        moss: "#6B7A49",
        reed: "#7A5C42",
        gold: "#C6A866",
        ink: "#1E1B18"
      },
      boxShadow: {
        // soft, earthy shadow (use shadow-ink/10 with bg-parchment/5 on cards)
        paper: "0 2px 10px rgba(30,27,24,0.12)",
      },
      borderRadius: {
        xl2: "1rem", // optional: a touch larger than rounded-xl
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
