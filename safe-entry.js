// safe-entry.js
// Minimal, non-networked entry handler for index.html and client-side image proxy
// Purpose: attach handlers without inline JS and avoid exposing API keys.

(function () {
  'use strict';

  function activateEntry() {
    try {
      const wrapper = document.getElementById('entry-page-wrapper');
      if (wrapper) wrapper.classList.add('fading-out');
      setTimeout(function () {
        console.log('ENTRY: page faded locally (no network calls).');
      }, 700);
    } catch (err) {
      console.error('safe-entry: activate failed', err);
    }
  }

  async function callGenerateImage(prompt) {
    try {
      const resp = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
      });
      if (!resp.ok) {
        console.warn('generate-image endpoint returned', resp.status);
        return null;
      }
      const json = await resp.json();
      return json.imageB64 || null;
    } catch (err) {
      console.error('callGenerateImage error', err);
      return null;
    }
  }

  // Override or provide generateHeroImage and generateStoryImage so inline scripts call the server proxy
  window.generateHeroImage = async function () {
    try {
      const prompt = window.__HERO_PROMPT__ || 'A futuristic robotic arm with a sleek, glowing hand gently touching a digital stream of data that forms the shape of a complex, beautiful double helix. The background is a clean, minimalist dark space with subtle light trails and a sense of depth. NO TEXT.';
      const b64 = await callGenerateImage(prompt);
      if (b64) {
        const heroSection = document.getElementById('hero');
        if (heroSection) heroSection.style.backgroundImage = `url('${b64}')`;
        return;
      }
      console.warn('Hero image generation failed — leaving placeholder.');
    } catch (e) { console.error(e); }
  };

  window.generateStoryImage = async function () {
    try {
      const prompt = window.__STORY_PROMPT__ || 'A clean, elegant visualization of the Memory DNA helix, a double helix made of glowing, interconnected data points. The helix is composed of subtle, geometric shapes and light trails, set against a dark, ethereal background with a sense of infinite data and knowledge. The colors are soft blues and purples, and there is a sense of immense complexity and beauty. NO TEXT.';
      const b64 = await callGenerateImage(prompt);
      if (b64) {
        const img = document.getElementById('story-image');
        if (img) img.src = b64;
        return;
      }
      console.warn('Story image generation failed — keeping placeholder.');
    } catch (e) { console.error(e); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var enter = document.getElementById('enter-button') || document.getElementById('enter') || document.querySelector('.enter-prompt');
    if (!enter) return;
    enter.setAttribute('role', 'button');
    enter.setAttribute('tabindex', '0');

    enter.addEventListener('click', function (e) {
      e.preventDefault();
      activateEntry();
    }, false);

    enter.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateEntry();
      }
    }, false);
  }, false);
})();
