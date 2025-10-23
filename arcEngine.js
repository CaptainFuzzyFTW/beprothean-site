// Arc-Engine: compute Transcendence T per provided formula.
export function computeTranscendence(Complexity, Compression, Neural, Patterns) {
  const phi = 1.61803398875;
  Complexity = Math.max(0, Math.min(1, Complexity));
  Compression = Math.max(0, Math.min(1, Compression));
  Neural = Math.max(0, Math.min(1, Neural));
  Patterns = Math.max(0, Math.min(1, Patterns));
  const base = 0.25 * Complexity + 0.25 * (1 - Compression) + 0.3 * Neural + 0.2 * Patterns;
  const T = (base * phi) % 1.0;
  return { T, components: { Complexity, Compression, Neural, Patterns, phi } };
}