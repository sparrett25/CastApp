function getRequestUrl(req) {
  const protocol =
    req.headers["x-forwarded-proto"] ||
    (req.socket?.encrypted ? "https" : "http");

  const host = req.headers.host || "localhost";

  return `${protocol}://${host}${req.url || "/api/transcribe"}`;
}

async function readMultipartForm(req) {
  const request = new Request(getRequestUrl(req), {
    method: req.method,
    headers: req.headers,
    body: req,
    duplex: "half",
  });

  return request.formData();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("Transcription route: OPENAI_API_KEY is missing.");

    return res.status(500).json({
      error: "Voice transcription is not configured.",
    });
  }

  try {
	  

    const form = await readMultipartForm(req);

	const audio = form.get("audio");

	if (!audio || typeof audio.arrayBuffer !== "function") {
	  return res.status(400).json({
		error: "No audio recording was received.",
	  });
	}

	if (!audio.size) {
	  return res.status(400).json({
		error: "The audio recording was empty.",
	  });
	}

	const formData = new FormData();

	formData.append(
	  "file",
	  audio,
	  audio.name || "journal-recording.webm"
	);

	formData.append("model", "gpt-4o-mini-transcribe");
	formData.append("language", "en");
	formData.append("response_format", "json");

console.log("Transcription audio type:", audio.type || "unknown");
console.log("Transcription audio bytes:", audio.size);
console.log("OPENAI key exists:", !!process.env.OPENAI_API_KEY);

const response = await fetch(
  "https://api.openai.com/v1/audio/transcriptions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: formData,
  }
);

const rawText = await response.text();

console.log("OpenAI transcription status:", response.status);

if (!response.ok) {
  console.error("OpenAI transcription error:", rawText);

  return res.status(response.status).json({
    error: "CAST could not turn that recording into words.",
  });
}

const data = JSON.parse(rawText);

const text = data?.text?.trim();

if (!text) {
  return res.status(422).json({
    error: "I couldn't quite make out those words. Please try speaking again.",
  });
}

return res.status(200).json({ text });


  } catch (error) {
    console.error("Transcription route failed:", error);

    return res.status(500).json({
      error: "I couldn't quite hear that. Please try speaking again.",
    });
  }
}