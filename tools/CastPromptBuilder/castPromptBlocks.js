export const timeStates = {
  blueHourDawn: `# TIME STATE — BLUE HOUR DAWN

## Environmental Behavior
- Light is cool, soft, and diffused
- Mist rests gently across the water surface
- The environment is quiet and undisturbed

## Wildlife Behavior
- Animals are still, resting, or barely active
- Birds remain perched
- No motion or interaction is present

## Emotional Tone
- anticipation
- quiet solitude
- inward stillness
- early silence`,

  softMorningRise: `# TIME STATE — SOFT MORNING RISE

## Environmental Behavior
- Light becomes slightly warmer and brighter
- Mist begins to lift subtly from the water
- The environment feels fresh and calm

## Wildlife Behavior
- Animals show subtle movement or repositioning
- Birds may shift posture or lightly interact
- No dramatic motion

## Emotional Tone
- gentle awakening
- quiet hopefulness
- calm attention
- renewal`,

  lateAfternoonWarmth: `# TIME STATE — LATE AFTERNOON WARMTH

## Environmental Behavior
- Light is warmer with soft golden tones
- Shadows become longer and more defined
- The environment feels settled and active in a calm way

## Wildlife Behavior
- Animals may be lightly active
- Movement is subtle and grounded
- No fast motion

## Emotional Tone
- familiarity
- calm activity
- grounded warmth
- ease`,

  goldenDusk: `# TIME STATE — GOLDEN DUSK

## Environmental Behavior
- Warm light stretches across water and shoreline
- Reflections deepen with soft shadows
- Mist begins reforming

## Wildlife Behavior
- Movement slows
- Animals settle into stillness
- No active interaction

## Emotional Tone
- slowing rhythm
- reflection
- transition
- emotional warmth`,

  quietEveningGlow: `# TIME STATE — QUIET EVENING GLOW

## Environmental Behavior
- Light fades into soft dusk tones
- Water darkens into reflective shadow
- The environment becomes hushed

## Wildlife Behavior
- Birds may appear as silhouettes in the sky
- Ground animals remain still or retreat
- Motion is soft and minimal

## Emotional Tone
- memory
- stillness
- quiet companionship
- emotional rest`,
};

export const weatherStates = {
  none: "",

  lightOvercast: `# WEATHER STATE — LIGHT OVERCAST

Apply a LIGHT OVERCAST weather state.

Preserve:
- composition
- object positions
- time-of-day lighting direction

Adjust:
- sky becomes softly clouded and diffused
- reduce contrast and saturation slightly
- soften shadows across all surfaces
- water reflections become more muted and less defined

Do not:
- introduce dramatic clouds
- darken the scene excessively
- change object placement or structure`,

  lightRain: `# WEATHER STATE — LIGHT RAIN

Apply a LIGHT RAIN weather state.

Preserve:
- composition
- object positions
- time-of-day lighting direction

Adjust:
- introduce fine, soft rain across the scene
- water surface develops fine, consistent ripple patterns
- reflections become slightly diffused and fragmented
- dock and objects appear slightly darkened from moisture
- atmosphere becomes gently hazy
- rain interaction must feel physically consistent across all surfaces

Do not:
- create heavy rain or storm conditions
- introduce splashes or dramatic motion
- alter object placement or scene structure`,

  morningFog: `# WEATHER STATE — MORNING FOG

Apply a MORNING FOG weather state.

Preserve:
- composition
- object positions
- time-of-day lighting direction

Adjust:
- introduce low-lying fog across water and shoreline
- background tree line becomes partially softened and obscured
- depth becomes layered with atmospheric separation
- reflections become diffused and low contrast

Do not:
- fully obscure the scene
- remove structural clarity of foreground elements
- alter object placement or perspective`,

  goldenHaze: `# WEATHER STATE — GOLDEN HAZE

Apply a GOLDEN HAZE weather state.

Preserve:
- composition
- object positions
- time-of-day lighting direction

Adjust:
- atmosphere becomes softly filled with warm haze
- light scatters gently across the scene
- distant elements become slightly diffused
- reflections take on a soft golden glow

Do not:
- reduce visibility excessively
- create fog-like density
- alter object placement or structure`,
};

export const pages = {
  papa: "Papa Base",
  home: "Home",
  fieldGuide: "Field Guide",
  locations: "Locations",
  planTrip: "Plan Trip",
  journal: "Journal",
  catchLedger: "Catch Ledger",
  profile: "Profile",
};

export const regions = {
  midwestFarmPond: "Midwest Farm Pond",
  centralFlorida: "Central Florida Freshwater",
  northernLakeCountry: "Northern Lake Country",
};

export const wildlifeByPage = {
  home: "Red-winged Blackbird",
  fieldGuide: "Blue Jay or Robin",
  locations: "Loon or Crane",
  planTrip: "Hawk or Eagle",
  journal: "Turtle",
  catchLedger: "Fish in pail or Kingfisher",
  profile: "White-tailed Deer",
  papa: "None",
};

export const optionalObjectsByPage = {
  home: "None",
  fieldGuide: "None",
  locations: "None",
  planTrip: "Map and Compass",
  journal: "Weathered Notebook",
  catchLedger: "Galvanized Pail",
  profile: "None",
  papa: "Fishing Rod in use",
};

export const baseConversionLock = `# Base Image Conversion Prompt

Render the exact same scene and composition as the provided image.

This is a transformation of an existing image, not a new scene creation.

Only environmental conditions may change.
All physical structure, layout, and subject positioning must remain identical.

Do not alter:
- camera framing or perspective
- spatial layout of all elements
- object placement, scale, or proportion
- environmental structure including dock, shoreline, trees, horizon
- character pose, position, or orientation if Papa is present

All geometry must remain identical.`;