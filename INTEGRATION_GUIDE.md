# Prothean Presentation Integration Guide

## Option 1: Generate Music with AI (FASTEST)

### Using Suno AI (suno.ai)

1. **Sign up at suno.ai**
2. **Copy prompts from prothean_soundtrack_guide.md** (Section: AI MUSIC GENERATION PROMPTS)
3. **Generate each track:**
   ```
   Track 1: "Dark ambient cinematic, solo cello, ominous synth pad..."
   Track 2: "Industrial cinematic, mechanical sounds, clock ticking..."
   [etc - 15 total tracks]
   ```
4. **Download as MP3** (320kbps)
5. **Save to:** `/Users/captainfuzzy/prothean_soundtrack/`

**Time:** 2-3 hours (Suno generates ~2 min per track)
**Cost:** Free tier (5 songs/day) or Pro ($10/month unlimited)

---

### Using Udio (udio.com) - Alternative

Same process as Suno:
- Copy prompts
- Generate tracks
- Download MP3s

**Better for:** More control over structure, extending tracks

---

## Option 2: Create Video Presentation (RECOMMENDED FOR LAUNCH)

### Tools Needed:
- **DaVinci Resolve** (FREE) or **Final Cut Pro** ($299 one-time)
- **Keynote** (free on Mac)
- Generated music tracks from Option 1

### Step-by-Step:

**A. Convert PDF to Keynote:**

```bash
# Open PDF in Keynote
open -a Keynote prothean_announcement_v1.pdf
```

Or manually:
1. Open Keynote → File → New
2. Import PDF slides
3. Each page becomes a slide

**B. Set Slide Timings (Keynote):**

Open `prothean_video_script.md` for timing:

- Slide 1 (Cover): 3 seconds
- Slide 2 (Dedication): 15 seconds
- Slide 3 (Statement): 7 seconds
- Slide 4 (400/400): 10 seconds
- [Continue for all 27 slides...]

In Keynote:
- Select slide → Inspector → Transition → Duration
- Set timing for each slide based on script

**C. Export Keynote as Video:**

Keynote → File → Export To → QuickTime
- Resolution: 4K (3840×2160)
- Format: H.264
- Frame rate: 30 fps

**D. Add Soundtrack in DaVinci Resolve:**

1. **Import video:**
   - File → Import → Select Keynote export

2. **Import audio tracks:**
   - File → Import → Select all 15 music tracks

3. **Timeline:**
   ```
   Track 1 (Video): Keynote slides
   Track 2 (Audio 1): Track 1 "The Lie" (0:00-1:30)
   Track 3 (Audio 2): Track 2 "Metered Existence" (1:30-3:00)
   Track 4 (Audio 3): Track 3 "This Isn't Progress" (3:00-5:00)
   [Continue for all 15 tracks...]
   ```

4. **Align music to script moments:**
   - Use `prothean_video_script.md` for exact timings
   - Add markers at key moments (e.g., 14:45 for "400/400")

5. **Export video:**
   - File → Deliver
   - Format: H.264
   - Resolution: 4K
   - Bitrate: 40 Mbps
   - Audio: AAC 320kbps

**Output:** `prothean_announcement_final.mp4`

---

## Option 3: Live Presentation with Synced Audio

### Using Keynote + Audio Playback

**A. Prepare Audio:**

Create single 33-minute audio file:
```bash
# Install ffmpeg if needed
brew install ffmpeg

# Concatenate all tracks
ffmpeg -i "concat:track01.mp3|track02.mp3|track03.mp3|..." -acodec copy prothean_full_soundtrack.mp3
```

**B. In Keynote:**

1. Open presentation
2. Add audio to first slide:
   - Inspector → Audio
   - Add prothean_full_soundtrack.mp3
   - Set: "Play across all slides"
   - Start: "Automatically"

3. Set slide timings to match music
4. Rehearse transitions

**C. Present:**

Keynote → Play → Play Slideshow
- Music plays continuously
- Advance slides at scripted moments
- Or set to auto-advance

---

## Option 4: Web Version with Audio Player

### Update HTML with Embedded Music

**A. Generate or download music tracks**

**B. Add HTML5 audio player:**

```bash
# Edit the web version
open -a "Visual Studio Code" prothean_announcement_web.html
```

Add before `</body>`:

```html
<!-- Audio Player (sticky bottom) -->
<div style="position: fixed; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.95); padding: 1rem; z-index: 1000; backdrop-filter: blur(10px);">
    <audio id="soundtrack" controls style="width: 100%; max-width: 800px; margin: 0 auto; display: block;">
        <source src="prothean_full_soundtrack.mp3" type="audio/mpeg">
        Your browser does not support audio playback.
    </audio>
    <p style="text-align: center; color: #C9A961; margin-top: 0.5rem; font-size: 0.9rem;">
        Prothean Emergent Intelligence Soundtrack
    </p>
</div>

<script>
// Auto-play on user interaction (browsers require this)
document.addEventListener('click', function() {
    const audio = document.getElementById('soundtrack');
    if (audio.paused) {
        audio.play();
    }
}, { once: true });
</script>
```

**C. Host music file:**

Upload `prothean_full_soundtrack.mp3` to same directory as HTML

---

## Option 5: Professional Video Production

### For Maximum Impact

**A. Hire professional narrator** (Fiverr, Voices.com)
- Send `prothean_video_script.md`
- Request: "Cinematic, authoritative, Apple keynote style"
- Cost: $200-500

**B. Commission professional composer** (if not using AI)
- Send `prothean_soundtrack_guide.md`
- Request: Full orchestral recording
- Cost: $5,000-20,000

**C. Professional video editor**
- Provide: PDF, narration, music, script
- Request: 4K video with motion graphics
- Cost: $2,000-5,000

**D. Or DIY with quality tools:**
- Motion graphics: Apple Motion ($50)
- Color grading: DaVinci Resolve (FREE)
- Sound design: Logic Pro ($200)

---

## Quick Start (30 Minutes)

**Fastest path to working presentation:**

1. **Generate 5 key tracks with Suno** (not all 15):
   - Track 1: "The Lie" (opening mood)
   - Track 7: "400" (big reveal)
   - Track 9: "Perfect Accuracy" (triumph)
   - Track 12: "Logan's Emergence" (partnership)
   - Track 15: "Welcome to Prothean Era" (finale)

2. **Use Keynote:**
   - Import `prothean_announcement_v1.pdf`
   - Add 5 music tracks to key slides
   - Set auto-advance timings

3. **Present:**
   - Full-screen mode
   - Let it play

**Total time:** 30-45 minutes
**Total cost:** $0 (Suno free tier)

---

## Recommended Workflow

**For public launch announcement:**

```
Day 1: Generate all music with Suno (15 tracks)
Day 2: Create Keynote with timings
Day 3: Export to video in DaVinci Resolve
Day 4: Add professional narration (optional)
Day 5: Final edits and color grading
Day 6: Upload to YouTube, website
Day 7: LAUNCH
```

---

## Files You Need

### Already Created:
✓ `prothean_announcement_v1.pdf` (presentation)
✓ `prothean_announcement_web.html` (web version)
✓ `prothean_video_script.md` (narration)
✓ `prothean_soundtrack_guide.md` (music specs)
✓ `prothean_social_media_kit.md` (promotional materials)

### To Generate:
☐ 15 music tracks (use Suno prompts)
☐ Combined soundtrack.mp3 (concatenate tracks)
☐ Final video file (Keynote + music + optional narration)

---

## Music Generation Commands

### Suno Workflow:

**For each of 15 tracks:**

1. Go to suno.ai
2. Click "Create"
3. Paste prompt from `prothean_soundtrack_guide.md`
4. Add duration hint: "[1:30]", "[2:00]", etc.
5. Generate
6. Download MP3
7. Rename: `01_the_lie.mp3`, `02_metered_existence.mp3`, etc.

### Batch Process (after download):

```bash
# Create soundtrack directory
mkdir -p ~/prothean_soundtrack

# Move all tracks there
mv ~/Downloads/*the_lie*.mp3 ~/prothean_soundtrack/01_the_lie.mp3
mv ~/Downloads/*metered*.mp3 ~/prothean_soundtrack/02_metered_existence.mp3
# ... repeat for all 15 tracks

# Combine into single file
cd ~/prothean_soundtrack
ffmpeg -f concat -safe 0 -i <(for f in *.mp3; do echo "file '$PWD/$f'"; done) -c copy prothean_full_soundtrack.mp3
```

---

## Testing Sync

**Before final production:**

1. Play music in one window
2. Play PDF slides in another
3. Advance slides manually at script timings
4. Verify emotional moments align:
   - "400/400" hits at 14:45 orchestral peak
   - "100%" hits at 17:30 climax
   - Final statement at 32:00 ultimate triumph

**If music doesn't align:**
- Adjust slide timings
- Or trim/extend music tracks

---

## Platform-Specific Export

### For YouTube:
- 4K (3840×2160)
- H.264, 40 Mbps
- AAC audio, 320 kbps
- Add subtitle file (SRT) from script

### For Website:
- 1080p (1920×1080) for bandwidth
- H.264, 8 Mbps
- AAC audio, 192 kbps
- WebM version for compatibility

### For Social Media:
- Square (1080×1080) for Instagram
- Vertical (1080×1920) for TikTok/Reels
- 16:9 (1920×1080) for Twitter/LinkedIn

---

## Next Steps

**Choose your path:**

**Path A (Fast):** Suno music + Keynote = presentation in 2 hours

**Path B (Quality):** Suno music + DaVinci Resolve + narration = professional video in 1 week

**Path C (Maximum):** Professional composer + editor + motion graphics = world-class production in 1 month

**All paths lead to the same destination: Announcing Prothean to the world.**

---

## Need Help?

**Music not syncing?**
- Check track durations match guide
- Verify slide timings in script
- Use DaVinci Resolve markers for precision

**Video export issues?**
- Reduce resolution to 1080p
- Check codec settings (H.264 most compatible)
- Try HandBrake for format conversion

**Audio quality problems?**
- Use 320kbps MP3 or FLAC
- Normalize volume levels (ffmpeg -af loudnorm)
- Check for clipping (should peak at -1 dBTP)

---

**Everything you need is ready. Time to integrate and launch.**
