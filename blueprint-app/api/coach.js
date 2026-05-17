import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY;

function normalizeMessages(messages, fallbackMessage) {
  const source =
    Array.isArray(messages) && messages.length > 0
      ? messages
      : [{ role: "user", content: fallbackMessage }];

  return source
    .map((message) => ({
      role: message.role === "assistant" || message.role === "coach" ? "assistant" : "user",
      content: String(message.content || message.text || "").slice(0, 4000),
    }))
    .filter((message) => message.content.trim().length > 0)
    .slice(-16);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY." });
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({ error: "Missing Supabase environment variables." });
    }

    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Missing authorization token." });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      return res.status(401).json({ error: "Invalid session." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const messages = normalizeMessages(body?.messages, body?.message);

    if (messages.length === 0) {
      return res.status(400).json({ error: "Missing message." });
    }

    const profile = body?.profile || {};

    const systemPrompt = `
You are Blueprint Coach, a private dating/profile improvement coach inside a product called Blueprint.

Tone:
- Direct, sharp, calm, and practical.
- No motivational fluff.
- No long disclaimers.
- Do not be cruel, but do not over-soften feedback.
- Give specific next moves.

Context:
- The user may be improving dating profiles, photos, conversation, style, confidence, or social behavior.
- Use the onboarding context if available.
- Keep responses concise unless the user asks for depth.

User onboarding context:
${JSON.stringify(profile.onboarding_data || {}, null, 2)}
`.trim();

    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5",
      max_tokens: 700,
      system: systemPrompt,
      messages,
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return res.status(200).json({
      reply: reply || "I could not generate a response. Try again.",
      usage: response.usage,
      model: response.model,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Coach request failed.",
    });
  }
}
