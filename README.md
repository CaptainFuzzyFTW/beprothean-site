# Prothean server (image proxy + Guardian & Arc-Engine)

Purpose:
- Provide a secure server-side proxy for image generation (no API keys in client).
- Enforce Guardian policy and Arc-Engine transcendence scoring.
- Serve Captain Fuzzy exclusively via CAPTAIN_TOKEN.

Quick start:
1. Copy the files into your repository.
2. Create .env with values from .env.example.
3. Install deps:
   npm ci
4. Run locally:
   CAPTAIN_TOKEN=thetoken GEN_API_KEY=thekey node server.js
5. Test:
   curl -X POST http://localhost:3000/api/generate-image -H "Authorization: Bearer thetoken" -H "Content-Type: application/json" -d '{"prompt":"A test prompt"}'

Security notes:
- Store GEN_API_KEY in a secret manager (KMS/Secrets Manager) in production.
- Do NOT commit secrets into the repo.
- Use an OIDC/auth service and rotate CAPTAIN_TOKEN for stronger identity enforcement when moving to production.
