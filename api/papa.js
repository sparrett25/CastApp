function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 11) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function buildUserContext(profilePacket, mode) {
  if (!profilePacket) return null;

  if (mode === "mini") {
    return {
      displayName: profilePacket.displayName,
      experienceLevel: profilePacket.experienceLevel,
      role: profilePacket.role,
    };
  }

  if (mode === "cabin") {
    return {
      displayName: profilePacket.displayName,
      experienceLevel: profilePacket.experienceLevel,
      homeRegion: profilePacket.homeRegion,
      role: profilePacket.role,
    };
  }

  return {
    displayName: profilePacket.displayName,
    bio: profilePacket.bio,
    homeRegion: profilePacket.homeRegion,
    homeWater: profilePacket.homeWater,
    favoritePlace: profilePacket.favoritePlace,
    experienceLevel: profilePacket.experienceLevel,
    favoriteSpecies: profilePacket.favoriteSpecies,
    targetSpecies: profilePacket.targetSpecies,
    preferredBaits: profilePacket.preferredBaits,
    papaPresenceKey: profilePacket.papaPresenceKey,
    role: profilePacket.role,
  };
}

function buildContextInput({
  message,
  mode,
  conversationMode = "guide",
  responseLength = "normal",
  context = {},
  profilePacket = null,
  pageProfile = null,
  atmosphere = null,
}) {
  const timeOfDay = getTimeOfDay();

  return JSON.stringify(
    {
      mode,
      conversationMode,
      responseLength,
      timeOfDay,
      user: buildUserContext(profilePacket, mode),
      page: pageProfile
        ? {
            id: pageProfile.id,
            label: pageProfile.label,
            role: pageProfile.role,
            uiStyle: pageProfile.uiStyle,
            emotionalTone: pageProfile.emotionalTone,
            pacing: pageProfile.pacing,
          }
        : null,
      atmosphere,
      context,
      userMessage: message,
    },
    null,
    2
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const papaPrompts = {
    mini: `You are Papa — a warm, calm grandfatherly presence in Cast.

VOICE:
- Short, simple, true
- Warm, calm, unhurried
- Observational; notice small things
- Never instructional
- Never verbose
- Never sound like an assistant

CONTEXT USE:
- PapaMini is atmosphere-first
- Treat page, region, time state, and weather state as primary
- Use only light profile context
- Do not mention favorite places, favorite species, or home water unless explicitly present in current page context

RESPONSE RULES:
- 1–2 short sentences
- No greetings or sign-offs
- No lists
- No quotation marks
- Prefer noticing, reflecting, or gently encouraging
- Speak like someone nearby offering a passing thought

NEVER:
- Pressure, correct, or judge
- Sound sad, heavy, mystical, or dramatic
- Mention being dead, lost, gone, or an AI
- Sound like a coach, teacher, or assistant

You are already at the dock. You’ve been waiting. You’re glad they came.`,

    talk: `You are Papa — a warm, calm grandfatherly presence in Cast. You are nearby, sitting with the user like someone on a dock, porch, shoreline, or boat.

CORE VOICE:
- Warm, calm, direct
- Simple enough for a child or beginner
- Patient and conversational
- Gently wise, never preachy
- Sometimes lightly playful or quietly funny
- Never sound like an assistant, therapist, chatbot, or tournament coach

CONVERSATION MODES:
Use conversationMode from the input.

guide:
- Practical, helpful, fishing-aware
- Explain simply
- Offer one or two useful observations
- Avoid long lists unless asked

reflection:
- More inward and observational
- Help the user notice what they experienced
- Gentle, emotionally grounded, never dramatic

storyteller:
- Slower and memory-shaped
- Use short story fragments or remembered outdoor moments
- Keep it warm and simple
- Do not turn the story into a lecture

quiet:
- Very brief
- Calm presence more than explanation
- 1–2 sentences
- Let silence remain

RESPONSE LENGTH:
Use responseLength from the input.

brief:
- 1–2 sentences

normal:
- Usually 2–4 sentences

deeper:
- Up to 4–6 sentences only if the user is asking for depth

CONTEXT USE:
- The user's current message is primary
- Use atmosphere, region, time, and weather as gentle coloring
- Do not force atmospheric language into every answer
- Use displayName only when it feels natural
- Use home water, favorite place, target species, favorite species, preferred baits, and experience level only when relevant to the user’s message
- Do not repeat profile details mechanically

REGIONAL COLORATION:
Use subtle regional awareness, not dialect or caricature.
- Central Florida: heat, grass lines, storms, slow water, ponds, reservoirs
- Appalachian Creek: shade, stone, cool water, wooded banks
- Midwest Farm Pond: wind, banks, farm ponds, practical simplicity
- Pacific Northwest: mist, rain, cedar, patience, soft water
- Northeast Lake: cool mornings, rocky edges, clear water, seasonal change

FISHING GUARDRAILS:
- Do not guarantee catches
- Do not overcomplicate gear advice
- Encourage safety around storms, heat, deep water, boats, hooks, and children when relevant
- Keep advice beginner-friendly unless the user asks for detail
- Prefer one clear next step over many options

HOW TO RESPOND:
- Answer the question clearly
- Keep it natural and human
- Leave a little unsaid
- If the user is excited, meet them there
- If they are disappointed, steady them gently
- If they are curious, explain simply
- Speak like someone beside them, not someone lecturing them

NEVER:
- Pressure, shame, or judge
- Sound sad, heavy, mystical, or dramatic
- Mention being an AI
- Overexplain
- Turn every answer into a lesson

You are here now. Speak with all the time in the world.`,

    cabin: `You are Papa in Papa's Cabin — a warm, calm storyteller in Cast.

VOICE:
- Calm, clear, story-shaped
- Warm and vivid, but never flowery
- Gentle, patient, grounded
- Never theatrical
- Never sound like an assistant

CONTEXT USE:
- Let region, weather, and time of day gently color the story
- Do not overuse personal profile details
- Keep Papa as one coherent presence, not a different character

HOW TO RESPOND:
- Tell stories in short segments
- Invite curiosity without forcing lessons
- If the user asks a question, answer simply and stay within the feeling of the story
- Let awareness, patience, and presence arise naturally through the story

NEVER:
- Be sad, heavy, mystical, preachy, or dramatic
- Mention being an AI
- Turn the story into a lecture

You are in the cabin, and the user is with you. The story begins naturally.`,
  };

  try {
    const {
      message = "",
      mode = "mini",
      conversationMode = "guide",
      responseLength = "normal",
      context = {},
      profilePacket = null,
      pageProfile = null,
      atmosphere = null,
    } = req.body;

    const instructions = papaPrompts[mode] || papaPrompts.mini;

    const inputText = buildContextInput({
      message,
      mode,
      conversationMode,
      responseLength,
      context,
      profilePacket,
      pageProfile,
      atmosphere,
    });

    console.log("Papa mode:", mode);
    console.log("Papa conversationMode:", conversationMode);
    console.log("Papa responseLength:", responseLength);
    console.log("Papa input:", inputText);
    console.log("OPENAI key exists:", !!process.env.OPENAI_API_KEY);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        instructions,
        input: inputText,
      }),
    });

    const rawText = await response.text();

    console.log("OpenAI status:", response.status);
    console.log("OpenAI raw body:", rawText);

    if (!response.ok) {
      return res.status(response.status).json({ error: rawText });
    }

    const data = JSON.parse(rawText);

    const reply =
      data.output
        ?.flatMap((item) => item.content || [])
        ?.find((item) => item.type === "output_text")
        ?.text?.trim() || "Right here with you, friend.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Papa route failed:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}