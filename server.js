// Minimal Express server for Prothean image proxy + Guardian and Arc-Engine checks.
// Usage: set GEN_API_KEY, CAPTAIN_TOKEN, PORT in env (see .env.example).
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { evaluatePrompt } from './guardian.js';
import { computeTranscendence } from './arcEngine.js';

const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: '10kb' }));

// Rate limiting: protect external API usage
const genLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // tune as needed
  message: { error: 'rate_limited' }
});

// Simple auth: ensure only Captain Fuzzy can call sensitive endpoints
function authenticateCaptain(req, res, next) {
  const auth = (req.headers.authorization || '').trim();
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : req.headers['x-captain-token'];
  if (!token || token !== process.env.CAPTAIN_TOKEN) {
    return res.status(403).json({ error: 'forbidden', message: 'caller not authorized' });
  }
  req.caller = { id: 'captainfuzzy', name: 'Captain Fuzzy' };
  next();
}

// POST /api/generate-image
app.post('/api/generate-image', authenticateCaptain, genLimiter, async (req, res) => {
  const prompt = String(req.body.prompt || '').trim();
  if (!prompt || prompt.length < 5) return res.status(400).json({ error: 'invalid_prompt' });
  if (prompt.length > 2000) return res.status(400).json({ error: 'prompt_too_long' });

  const decision = evaluatePrompt({ prompt, caller: req.caller });
  if (!decision.allow) return res.status(403).json({ error: 'disallowed_by_guardian', reasons: decision.reasons });

  const metrics = {
    Complexity: Math.min(1.0, Math.max(0.0, (prompt.length / 2000))),
    Compression: 0.5,
    Neural: 0.5,
    Patterns: 0.5
  };
  const { T } = computeTranscendence(metrics.Complexity, metrics.Compression, metrics.Neural, metrics.Patterns);
  if (T <= 0.618) {
    return res.status(403).json({ error: 'low_transcendence', message: 'Request did not meet transcendence threshold', T });
  }

  const genKey = process.env.GEN_API_KEY;
  if (!genKey) return res.status(500).json({ error: 'server_misconfigured', message: 'Missing GEN_API_KEY' });

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${encodeURIComponent(genKey)}`;
  const payload = { instances: { prompt }, parameters: { sampleCount: 1 } };

  try {
    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.warn('external API error', resp.status, text);
      return res.status(502).json({ error: 'external_api_error', status: resp.status });
    }
    const json = await resp.json();
    const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) return res.status(502).json({ error: 'no_image_returned' });

    return res.json({ imageB64: `data:image/png;base64,${b64}`, T });
  } catch (err) {
    console.error('generate-image failed', err);
    return res.status(500).json({ error: 'server_error' });
  }
});

// Health
app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Prothean server listening on ${port}`));
