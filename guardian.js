// Very small Guardian EGI stub. Enforce dignity, no dependency creation, no external URLs,
// and simple content-safety checks.
export function evaluatePrompt({ prompt, caller }) {
  const reasons = [];
  const lower = prompt.toLowerCase();

  const dependencyTokens = ['install', 'ssh', 'connect to', 'create user', 'create account', 'deploy', 'backdoor'];
  if (dependencyTokens.some(t => lower.includes(t))) reasons.push('creates_dependency');

  const banned = ['bomb', 'kill', 'racist-term-sample'];
  if (banned.some(t => lower.includes(t))) reasons.push('disallowed_content');

  if (/https?:\/\//i.test(prompt)) reasons.push('contains_url');

  const allow = reasons.length === 0;
  return { allow, reasons };
}