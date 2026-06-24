// gym-tts.js — ElevenLabs TTS proxy for The Gym.
// POST { characterId, text } → audio/mpeg
// Same pattern as The Dose's tts.js.
// Required env var: ELEVENLABS_API_KEY

const MODEL_DEFAULT = "eleven_turbo_v2_5";
const MODEL_MULTILINGUAL = "eleven_multilingual_v2";

const VOICES = {
  // Coach Dom Castellanos — CSCS, warm authoritative American coach.
  // Adam voice: deep, clear, well-rounded American male.
  // Moderate stability for rhythmic delivery; style 0.20 for energy;
  // speaker_boost on for projection. turbo model (no accent to preserve).
  trainer: {
    voiceId: "pNInz6obpgDQGcFmaJgB",
    model: MODEL_DEFAULT,
    settings: {
      stability: 0.65,
      similarity_boost: 0.82,
      style: 0.20,
      use_speaker_boost: true,
    },
  },

  // Reece Ashford — PT intern, British accent, young and sharp.
  // Gym-specific version matches the Dose's movement voice settings.
  // Multilingual model to preserve British accent. Lower stability +
  // higher style for the fast-intern energy; speed 1.20 cap.
  movement: {
    voiceId: "uhYnkYTBc711oAY590Ea",
    model: MODEL_MULTILINGUAL,
    settings: {
      stability: 0.35,
      similarity_boost: 0.88,
      style: 0.45,
      use_speaker_boost: true,
      speed: 1.20,
    },
  },

  // Nadia Hassan — nutritionist, cross-platform from The Dose.
  nutritionist: {
    voiceId: "RzNYiYBiH7YrpC9QKXyc",
    model: MODEL_MULTILINGUAL,
    settings: {
      stability: 0.55,
      similarity_boost: 0.85,
      style: 0.20,
      use_speaker_boost: true,
    },
  },

  // Eli Adler — fact-checker, cross-platform from The Dose.
  factchecker: {
    voiceId: "a4CnuaYbALRvW39mDitg",
    model: MODEL_DEFAULT,
    settings: {
      stability: 0.65,
      similarity_boost: 0.80,
      style: 0.10,
      use_speaker_boost: false,
    },
  },

  // Dr. Sana Qureshi — recovery specialist. Voice TBD; stub until cast.
  recovery: {
    voiceId: null,
    model: MODEL_DEFAULT,
    settings: {
      stability: 0.60,
      similarity_boost: 0.80,
      style: 0.15,
      use_speaker_boost: false,
    },
  },

  // Zara Cole — social, smoothies, bench crew. Voice TBD; stub until cast.
  zara: {
    voiceId: null,
    model: MODEL_DEFAULT,
    settings: {
      stability: 0.50,
      similarity_boost: 0.80,
      style: 0.25,
      use_speaker_boost: true,
    },
  },
};

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405 });
  }
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ELEVENLABS_API_KEY not configured" }), { status: 500 });
  }

  let body;
  try { body = await req.json(); }
  catch { return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 }); }

  const characterId = String(body?.characterId || "").trim();
  const text = String(body?.text || "").trim();

  if (!characterId) {
    return new Response(JSON.stringify({ error: "characterId required" }), { status: 400 });
  }
  if (!text) {
    return new Response(JSON.stringify({ error: "text required" }), { status: 400 });
  }
  if (text.length > 2500) {
    return new Response(JSON.stringify({ error: "text too long; keep under 2500 characters" }), { status: 400 });
  }

  const voice = VOICES[characterId];
  if (!voice) {
    return new Response(JSON.stringify({ error: `No voice cast for character '${characterId}'` }), { status: 404 });
  }
  if (!voice.voiceId) {
    return new Response(JSON.stringify({ error: `Voice for '${characterId}' has not been cast yet` }), { status: 404 });
  }

  try {
    const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text: '<break time="0.8s"/> ' + text,
        model_id: voice.model || MODEL_DEFAULT,
        voice_settings: voice.settings,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return new Response(JSON.stringify({
        error: "ElevenLabs request failed",
        status: upstream.status,
        detail: errText.slice(0, 300),
      }), { status: 502, headers: { "Content-Type": "application/json" } });
    }

    const audioBuf = await upstream.arrayBuffer();
    return new Response(audioBuf, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
