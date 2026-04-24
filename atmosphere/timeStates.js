export const timeStates = {
  blue_hour_dawn: {
    id: "blue_hour_dawn",
    label: "Blue Hour Dawn",
    mood: ["quiet", "anticipatory", "reflective"],
    lighting: "Soft predawn blue atmosphere with faint amber emergence on the horizon. Low contrast lighting and gentle reflected light across still water.",
    ui: {
  overlay: "from-black/30 via-black/15 to-black/45",
  cardOpacity: 0.18,
  textTone: "soft",
  glow: "cool",

  bubble: {
  papaBg: "rgba(36, 54, 68, 0.30)",
  userBg: "rgba(178, 197, 214, 0.18)",
  border: "rgba(220, 235, 245, 0.10)",
  text: "rgba(245, 249, 255, 0.94)",
  blur: "18px",
  shadow: "0 0 18px rgba(160, 200, 230, 0.08)"
  },

  input: {
    bg: "rgba(150,170,190,0.14)",
    border: "rgba(255,255,255,0.08)",
    text: "rgba(255,255,255,0.92)",
    placeholder: "rgba(255,255,255,0.42)"
  }
 }
 },

  late_afternoon: {
    id: "late_afternoon",
    label: "Late Afternoon",
    mood: ["warm", "grounded", "exploratory"],
    lighting: "Warm afternoon sunlight with amber highlights across water and vegetation. Rich reflections and gentle contrast with grounded warmth.",
    ui: {
  overlay: "from-black/30 via-black/15 to-black/45",
  cardOpacity: 0.18,
  textTone: "soft",
  glow: "cool",

  bubble: {
  papaBg: "rgba(88, 78, 54, 0.24)",
  userBg: "rgba(230, 200, 155, 0.18)",
  border: "rgba(255, 245, 220, 0.12)",
  text: "rgba(255, 252, 244, 0.94)",
  blur: "16px",
  shadow: "0 0 18px rgba(255, 220, 150, 0.08)"
	},

  input: {
    bg: "rgba(150,170,190,0.14)",
    border: "rgba(255,255,255,0.08)",
    text: "rgba(255,255,255,0.92)",
    placeholder: "rgba(255,255,255,0.42)"
 }
 }
 }, 

  evening_glow: {
    id: "evening_glow",
    label: "Evening Glow",
    mood: ["reflective", "warm", "settling"],
    lighting: "Warm evening light with soft amber reflections across still water. Deepening dusk tones and gentle lantern glow create a calm reflective atmosphere.",
    ui: {
  overlay: "from-black/30 via-black/15 to-black/45",
  cardOpacity: 0.18,
  textTone: "soft",
  glow: "warm",

  bubble: {
  papaBg: "rgba(66, 72, 78, 0.34)",
  userBg: "rgba(142, 118, 96, 0.22)",
  border: "rgba(230, 235, 240, 0.08)",
  text: "rgba(245, 242, 238, 0.94)",
  blur: "20px",
  shadow: "0 0 22px rgba(0, 0, 0, 0.12)"
	},

  input: {
    bg: "rgba(150,170,190,0.14)",
    border: "rgba(255,255,255,0.08)",
    text: "rgba(255,255,255,0.92)",
    placeholder: "rgba(255,255,255,0.42)"
   }
 }
 },
};