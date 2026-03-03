import { useState, useEffect, useRef } from "react";

const PHASES = [
  {
    id: "intro",
    type: "intro",
  },
  {
    id: "week1",
    label: "Week 1",
    sessions: [
      { type: "checkin", label: "Check In" },
      { type: "practice", practiceType: "breath", label: "Breathwork" },
      { type: "practice", practiceType: "smoke", label: "Black & White Smoke" },
      { type: "reflection", label: "Reflection" },
      { type: "note", label: "A Note on Brains" },
    ],
  },
  {
    id: "week2",
    label: "Week 2",
    sessions: [
      { type: "checkin", label: "Check In" },
      { type: "practice", practiceType: "breath", label: "Breathwork" },
      { type: "practice", practiceType: "heart", label: "Heart Meditation" },
      { type: "reflection", label: "Reflection" },
      { type: "note", label: "A Note on Brains" },
    ],
  },
  {
    id: "week3",
    label: "Week 3",
    sessions: [
      { type: "checkin", label: "Check In" },
      { type: "practice", practiceType: "breath", label: "Breathwork" },
      { type: "practice", practiceType: "space", label: "Space Meditation" },
      { type: "reflection", label: "Reflection" },
      { type: "note", label: "A Gentle Reminder" },
    ],
  },
  {
    id: "week4",
    label: "Week 4",
    sessions: [
      { type: "checkin", label: "Check In" },
      { type: "practice", practiceType: "walking", label: "Walking Meditation" },
      { type: "practice", practiceType: "gratitude", label: "Gratitude Meditation" },
      { type: "reflection", label: "Reflection" },
      { type: "note", label: "A Gentle Reminder" },
    ],
  },
  {
    id: "week5",
    label: "Week 5",
    sessions: [
      { type: "checkin", label: "Check In" },
      { type: "practice", practiceType: "lovingkindness", label: "Loving-Kindness" },
      { type: "practice", practiceType: "bodyscan", label: "Body Scan" },
      { type: "reflection", label: "Reflection" },
      { type: "note", label: "A Gentle Reminder" },
    ],
  },
  {
    id: "week6",
    label: "Week 6",
    sessions: [
      { type: "checkin", label: "Check In" },
      { type: "practice", practiceType: "visualization", label: "Visualization" },
      { type: "practice", practiceType: "manifestation", label: "Manifestation" },
      { type: "reflection", label: "Reflection" },
      { type: "note", label: "A Gentle Reminder" },
    ],
  },
];

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@400;500;600&display=swap";
document.head.appendChild(fontLink);

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f7c5e0; }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #f9b8db 0%, #e8a0cc 40%, #c9a0e8 100%);
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .app::before {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at 20% 20%, rgba(255,220,240,0.4) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(180,140,220,0.3) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    position: relative;
    z-index: 1;
  }

  /* INTRO */
  .intro-card {
    background: rgba(255,255,255,0.25);
    backdrop-filter: blur(16px);
    border: 1.5px solid rgba(255,255,255,0.5);
    border-radius: 32px;
    padding: 56px 48px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(180,80,160,0.15);
  }

  .intro-title {
    font-family: 'Fraunces', serif;
    font-size: 72px;
    font-weight: 900;
    color: #f5f0a0;
    text-shadow: 0 4px 20px rgba(180,80,140,0.3);
    line-height: 1;
    letter-spacing: -2px;
    margin-bottom: 8px;
  }

  .intro-subtitle {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-size: 22px;
    color: rgba(255,255,255,0.85);
    margin-bottom: 40px;
  }

  .author-badge {
    display: inline-block;
    background: rgba(255,255,255,0.3);
    border: 1px solid rgba(255,255,255,0.5);
    color: white;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 8px 20px;
    border-radius: 100px;
    margin-bottom: 48px;
  }

  .intro-phases {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 40px;
    text-align: left;
  }

  .phase-row {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255,255,255,0.2);
    border-radius: 16px;
    padding: 14px 18px;
    cursor: pointer;
    border: 1.5px solid rgba(255,255,255,0.3);
    transition: all 0.2s ease;
  }

  .phase-row:hover {
    background: rgba(255,255,255,0.35);
    transform: translateX(4px);
  }

  .phase-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f5f0a0, #f0c040);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: #80400a;
    flex-shrink: 0;
  }

  .phase-dot.completed { background: linear-gradient(135deg, #a0e8c0, #40c080); }
  .phase-dot.locked { background: rgba(255,255,255,0.3); color: rgba(255,255,255,0.6); }

  .phase-info { flex: 1; }
  .phase-name { font-weight: 600; color: white; font-size: 15px; }
  .phase-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  .start-btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #f5f0a0, #f0c040);
    border: none;
    border-radius: 18px;
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 700;
    color: #804010;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(180,120,0,0.25);
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
  }

  .start-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(180,120,0,0.35); }

  /* NAV */
  .top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .back-btn {
    background: rgba(255,255,255,0.3);
    border: 1.5px solid rgba(255,255,255,0.5);
    border-radius: 12px;
    color: white;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .back-btn:hover { background: rgba(255,255,255,0.45); }

  .step-indicator {
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
  }

  /* WEEK SELECTOR */
  .week-nav {
    display: flex;
    gap: 8px;
    margin-bottom: 28px;
  }

  .week-tab {
    flex: 1;
    padding: 10px;
    border-radius: 14px;
    border: 1.5px solid rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.8);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .week-tab.active {
    background: rgba(255,255,255,0.35);
    color: white;
    border-color: rgba(255,255,255,0.7);
  }

  /* CARDS */
  .card {
    background: rgba(255,255,255,0.28);
    backdrop-filter: blur(16px);
    border: 1.5px solid rgba(255,255,255,0.5);
    border-radius: 28px;
    padding: 36px 32px;
    margin-bottom: 20px;
    box-shadow: 0 12px 40px rgba(160,60,140,0.12);
  }

  .card-title {
    font-family: 'Fraunces', serif;
    font-size: 42px;
    font-weight: 900;
    color: #f5f0a0;
    text-shadow: 0 2px 10px rgba(160,60,120,0.3);
    line-height: 1.1;
    margin-bottom: 24px;
  }

  .card-body {
    color: rgba(255,255,255,0.9);
    font-size: 16px;
    line-height: 1.7;
  }

  .journal-prompt {
    color: #f5f0a0;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 12px;
    margin-top: 24px;
  }

  .journal-textarea {
    width: 100%;
    min-height: 120px;
    background: rgba(255,255,255,0.2);
    border: 1.5px solid rgba(255,255,255,0.4);
    border-radius: 16px;
    padding: 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: white;
    resize: vertical;
    outline: none;
    transition: border 0.2s;
    margin-bottom: 16px;
  }

  .journal-textarea::placeholder { color: rgba(255,255,255,0.45); }
  .journal-textarea:focus { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.28); }

  /* PRACTICE CARDS */
  .practice-box {
    background: rgba(130,100,220,0.35);
    border: 1.5px solid rgba(160,130,240,0.5);
    border-radius: 20px;
    padding: 28px;
    margin: 20px 0;
    text-align: center;
    color: white;
    font-size: 16px;
    line-height: 1.8;
  }

  .practice-name {
    font-family: 'Fraunces', serif;
    font-size: 26px;
    font-weight: 700;
    color: #f5f0a0;
    margin-bottom: 16px;
  }

  .breath-steps {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 12px;
  }

  .breath-step {
    background: rgba(255,255,255,0.15);
    border-radius: 10px;
    padding: 8px 16px;
    font-weight: 500;
  }

  /* TIMER */
  .timer-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin: 24px 0;
  }

  .timer-ring {
    position: relative;
    width: 140px;
    height: 140px;
  }

  .timer-ring svg {
    transform: rotate(-90deg);
  }

  .timer-track {
    fill: none;
    stroke: rgba(255,255,255,0.2);
    stroke-width: 6;
  }

  .timer-progress {
    fill: none;
    stroke: #f5f0a0;
    stroke-width: 6;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s linear;
  }

  .timer-display {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Fraunces', serif;
    font-size: 34px;
    font-weight: 700;
    color: white;
  }

  .timer-btns {
    display: flex;
    gap: 10px;
  }

  .timer-btn {
    padding: 12px 24px;
    border-radius: 14px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .timer-btn.primary {
    background: linear-gradient(135deg, #f5f0a0, #f0c040);
    color: #804010;
    box-shadow: 0 6px 18px rgba(180,120,0,0.3);
  }

  .timer-btn.secondary {
    background: rgba(255,255,255,0.2);
    color: white;
    border: 1.5px solid rgba(255,255,255,0.4);
  }

  .timer-btn:hover { transform: translateY(-1px); }

  /* SMOKE BOX */
  .smoke-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 20px;
  }

  .smoke-box {
    border-radius: 16px;
    padding: 20px 16px;
    text-align: center;
    font-size: 14px;
    line-height: 1.6;
  }

  .smoke-box.light {
    background: white;
    color: #333;
  }

  .smoke-box.dark {
    background: #111;
    color: white;
  }

  .smoke-label {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 8px;
  }

  .smoke-eq {
    font-size: 22px;
    margin: 4px 0;
  }

  /* HEART */
  .heart-visual {
    font-size: 80px;
    text-align: center;
    margin: 20px 0;
    animation: heartbeat 2s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  /* BRAIN NOTE */
  .brain-bubble {
    background: rgba(200,60,60,0.8);
    border-radius: 24px;
    padding: 24px;
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    margin: 24px 0;
  }

  .brain-callout {
    background: rgba(130,100,220,0.4);
    border-radius: 20px;
    padding: 24px;
    color: white;
    font-size: 16px;
    text-align: center;
    line-height: 1.7;
    margin-top: 16px;
  }

  /* NEXT BTN */
  .next-btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #f5f0a0, #f0c040);
    border: none;
    border-radius: 18px;
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 700;
    color: #804010;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(180,120,0,0.2);
    transition: all 0.2s ease;
    margin-top: 8px;
  }

  .next-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(180,120,0,0.3); }

  /* COMPLETION */
  .completion-card {
    text-align: center;
    padding: 60px 40px;
  }

  .completion-emoji {
    font-size: 72px;
    margin-bottom: 20px;
    display: block;
  }

  .completion-title {
    font-family: 'Fraunces', serif;
    font-size: 48px;
    font-weight: 900;
    color: #f5f0a0;
    margin-bottom: 16px;
  }

  .completion-text {
    color: rgba(255,255,255,0.85);
    font-size: 17px;
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .flower {
    position: fixed;
    pointer-events: none;
    font-size: 28px;
    animation: floatUp 6s ease-in-out infinite;
    opacity: 0.5;
  }

  @keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { transform: translateY(-100px) rotate(20deg); opacity: 0; }
  }

  .saved-badge {
    display: inline-block;
    background: rgba(100,220,140,0.3);
    border: 1px solid rgba(100,220,140,0.5);
    color: #a0ffc0;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 100px;
    margin-left: 10px;
    vertical-align: middle;
  }
`;

const styleEl = document.createElement("style");
styleEl.textContent = styles;
document.head.appendChild(styleEl);

// ---- TIMER ----
function BreathTimer({ duration = 300 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(intervalRef.current); setRunning(false); setDone(true); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = () => { clearInterval(intervalRef.current); setTimeLeft(duration); setRunning(false); setDone(false); };
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  const r = 56, circ = 2 * Math.PI * r;
  const progress = circ - (timeLeft / duration) * circ;

  return (
    <div className="timer-section">
      <div className="timer-ring">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle className="timer-track" cx="70" cy="70" r={r} />
          <circle className="timer-progress" cx="70" cy="70" r={r}
            strokeDasharray={circ} strokeDashoffset={progress} />
        </svg>
        <div className="timer-display">{mins}:{secs}</div>
      </div>
      {done ? (
        <div style={{ color: "#a0ffc0", fontWeight: 700, fontSize: 17 }}>✓ Session complete!</div>
      ) : null}
      <div className="timer-btns">
        <button className="timer-btn primary" onClick={() => setRunning(r => !r)}>
          {running ? "⏸ Pause" : (done ? "✓ Done" : "▶ Start")}
        </button>
        <button className="timer-btn secondary" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

// ---- CHECKIN ----
function CheckIn({ data, onChange }) {
  return (
    <div className="card">
      <div className="card-title">Where I am today</div>
      <div className="journal-prompt">How am I feeling in this moment:</div>
      <textarea className="journal-textarea" rows={5} placeholder="Write freely..."
        value={data.feeling || ""} onChange={e => onChange({ ...data, feeling: e.target.value })} />
      <div className="journal-prompt">Something I've been noticing lately:</div>
      <textarea className="journal-textarea" rows={5} placeholder="What's been on your mind..."
        value={data.noticing || ""} onChange={e => onChange({ ...data, noticing: e.target.value })} />
    </div>
  );
}

// ---- PRACTICES ----
function BreathPractice() {
  return (
    <div className="card">
      <div className="card-title">My Practice 1/2</div>
      <div className="practice-box">
        <div className="practice-name">Breathwork</div>
        <p>Set a timer for 5 minutes. During this time, focus only on your breathing.</p>
        <div className="breath-steps">
          <div className="breath-step">🌬 Breathe in for 6, 5, 4, 3, 2, 1…</div>
          <div className="breath-step">⏸ Hold it for a moment</div>
          <div className="breath-step">💨 Breathe out for 6, 5, 4, 3, 2, 1…</div>
        </div>
      </div>
      <BreathTimer duration={300} />
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center", fontStyle: "italic" }}>
        It's OK to notice you feel nothing has changed — just notice.
      </p>
    </div>
  );
}

function SmokePractice() {
  return (
    <div className="card">
      <div className="card-title">My Practice 2/2</div>
      <div className="practice-box">
        <div className="practice-name">Black & White Smoke</div>
        <p>If you have a lot of things in your head — worries, stress, things you can't understand — we're going to process it.</p>
        <div className="smoke-grid">
          <div className="smoke-box light">
            <div className="smoke-label">Inhale</div>
            <div style={{ fontSize: 28 }}>🤍</div>
            <div className="smoke-eq">= peace, energy, wisdom</div>
            <div style={{ fontSize: 12, color: "#666" }}>Pure white light entering your body</div>
          </div>
          <div className="smoke-box dark">
            <div className="smoke-label">Exhale</div>
            <div style={{ fontSize: 28 }}>🖤</div>
            <div className="smoke-eq">= stress, anxiety, negativity</div>
            <div style={{ fontSize: 12, color: "#aaa" }}>Thick black smoke leaving your body</div>
          </div>
        </div>
      </div>
      <BreathTimer duration={300} />
    </div>
  );
}

function HeartPractice() {
  return (
    <div className="card">
      <div className="card-title">My Practice 2/2</div>
      <div className="practice-box">
        <div className="practice-name">Heart Meditation</div>
        <p>Bring all your focus from your head to your heart. Imagine you are breathing from your heart — feel it expand and open.</p>
        <div className="heart-visual">🧡</div>
        <p>Place your hand on your chest. Let each breath fill the space around your heart. Stay there.</p>
      </div>
      <BreathTimer duration={300} />
    </div>
  );
}

function SpacePractice() {
  return (
    <div className="card">
      <div className="card-title">My Practice 2/2</div>
      <div className="practice-box">
        <div className="practice-name">Space Meditation</div>
        <div style={{ fontSize: 40, margin: "16px 0", letterSpacing: 6, lineHeight: 1.4 }}>
          🌅<br/>〰️〰️〰️〰️〰️〰️<br/>🚶
        </div>
        <p style={{ marginBottom: 14 }}>
          Close your eyes. Imagine you are standing on a wide, open beach at low tide.
        </p>
        <p style={{ marginBottom: 14 }}>
          The ocean is out there — you can see it, you can hear the waves. But right now, the water is far away. There is a long, quiet stretch of wet sand between you and the sea.
        </p>
        <p style={{ marginBottom: 14 }}>
          Feel the sand beneath your feet. The air is soft and salty. The sky is open above you.
        </p>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: "16px 20px", margin: "16px 0", fontStyle: "italic" }}>
          That space between you and the ocean — <strong>that is the space between you and your thoughts.</strong>
        </div>
        <p style={{ marginBottom: 14 }}>
          The waves are still there. Your thoughts are still there. But you are here, on the shore, calm and grounded. You don't need to walk into the water. You just watch it from a safe, peaceful distance.
        </p>
        <p style={{ opacity: 0.85 }}>
          With every breath, feel that space grow a little wider. You are the beach. The thoughts are the tide — they come, they go, and you remain.
        </p>
      </div>
      <BreathTimer duration={300} />
    </div>
  );
}

function WalkingPractice() {
  const [phase, setPhase] = useState(0);
  const phases = [
    {
      title: "Arrive in your body",
      emoji: "🧘",
      cue: "Before you take a single step, stand still for a moment. Feel your feet on the ground. Notice the weight of your body, the air on your skin. You are here. You are about to move — but first, just arrive.",
    },
    {
      title: "Begin walking — slowly",
      emoji: "🚶",
      cue: "Start walking at half your normal pace. With every step, feel the heel touch down, then the ball of the foot, then the toes. Left. Right. Left. Right. Each step is its own complete moment.",
    },
    {
      title: "Breathe with your steps",
      emoji: "🌬️",
      cue: "Inhale for 4 steps. Exhale for 4 steps. You don't need to count perfectly — just let the breath and the movement find each other. Your body knows how to do this.",
    },
    {
      title: "Notice without naming",
      emoji: "🌿",
      cue: "What do you see? What do you hear? What do you feel? Don't label it as good or bad — just notice. A sound. A color. The temperature of the air. You are not going anywhere. You are just here, moving through the present moment.",
    },
    {
      title: "Return & land",
      emoji: "🌱",
      cue: "Come to a gentle stop. Stand still again. Take three slow, full breaths. Notice how your body feels different now than when you started. This is what it means to be alive and present.",
    },
  ];
  const current = phases[phase];
  return (
    <div className="card">
      <div className="card-title">My Practice 1/2</div>
      <div className="practice-box">
        <div className="practice-name">Walking Meditation</div>
        <p style={{ marginBottom: 18 }}>
          Meditation doesn't have to happen on a cushion with closed eyes. This practice turns movement itself into stillness. You can do this anywhere — a hallway, a park, your backyard.
        </p>
        <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 18, padding: "24px 20px", marginBottom: 16 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>{current.emoji}</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#f5f0a0", marginBottom: 14 }}>
            {phase + 1}. {current.title}
          </div>
          <p style={{ lineHeight: 1.75, fontStyle: "italic", fontSize: 15 }}>{current.cue}</p>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
          {phases.map((_, i) => (
            <div key={i} onClick={() => setPhase(i)} style={{
              width: 10, height: 10, borderRadius: "50%", cursor: "pointer",
              background: i === phase ? "#f5f0a0" : "rgba(255,255,255,0.3)",
              transition: "all 0.2s", flexShrink: 0,
            }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="timer-btn secondary" onClick={() => setPhase(s => Math.max(0, s - 1))}
            style={{ opacity: phase === 0 ? 0.4 : 1 }} disabled={phase === 0}>← Previous</button>
          <button className="timer-btn primary" onClick={() => setPhase(s => Math.min(phases.length - 1, s + 1))}
            style={{ opacity: phase === phases.length - 1 ? 0.4 : 1 }} disabled={phase === phases.length - 1}>Next →</button>
        </div>
      </div>
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, textAlign: "center", fontStyle: "italic", marginTop: 8 }}>
        No timer needed — let your body set the pace. Aim for 10–15 minutes.
      </p>
    </div>
  );
}

function GratitudePractice() {
  const [items, setItems] = useState(["", "", ""]);
  const [expanded, setExpanded] = useState(null);
  const update = (i, val) => { const next = [...items]; next[i] = val; setItems(next); };
  const prompts = [
    "Something small that brought me comfort today…",
    "A person I am grateful to have in my life, and why…",
    "Something about myself I appreciate right now…",
  ];
  const icons = ["🌱", "🌿", "🌸"];
  return (
    <div className="card">
      <div className="card-title">My Practice 2/2</div>
      <div className="practice-box">
        <div className="practice-name">Gratitude Meditation</div>
        <div style={{ fontSize: 48, margin: "12px 0" }}>🌻</div>
        <p style={{ marginBottom: 14 }}>
          Gratitude is not a list. It is a <em>direction of attention.</em> This practice trains your nervous system to notice what is already good — even on hard days.
        </p>
        <p style={{ marginBottom: 20, opacity: 0.85 }}>
          Close your eyes. Take three slow breaths. Then let these three things rise naturally — don't force it. Tiny things count. <em>The coffee this morning. A moment of quiet. That one text from a friend.</em>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          {items.map((item, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 22, marginTop: 2 }}>{icons[i]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontStyle: "italic" }}>{prompts[i]}</div>
                  <textarea
                    rows={2}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.4)",
                      borderRadius: 12, padding: "12px 14px", color: "white", fontSize: 15,
                      fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none",
                    }}
                    placeholder="Write freely…"
                    value={item}
                    onChange={e => update(i, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 16px", fontStyle: "italic", fontSize: 14, opacity: 0.85 }}>
          Now sit with what you wrote for a moment. Don't just think it — let yourself <strong>feel it in your body.</strong> Where does gratitude live in you?
        </div>
      </div>
      <BreathTimer duration={300} />
    </div>
  );
}

function LovingKindnessPractice() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { to: "Yourself", emoji: "🤗", color: "rgba(245,200,100,0.25)", lines: ["May I be happy.", "May I be healthy.", "May I be at peace.", "May I be free from suffering."], note: "This is the hardest one for most people. Start here anyway. You deserve your own compassion first." },
    { to: "Someone you love", emoji: "💛", color: "rgba(255,180,180,0.2)", lines: ["May you be happy.", "May you be healthy.", "May you be at peace.", "May you be free from suffering."], note: "Picture their face. Feel warmth moving from your chest outward toward them." },
    { to: "Someone neutral", emoji: "🌿", color: "rgba(150,220,160,0.2)", lines: ["May you be happy.", "May you be healthy.", "May you be at peace.", "May you be free from suffering."], note: "A neighbor. A cashier. Someone you passed on the street. They have a whole life, just like you." },
    { to: "All beings everywhere", emoji: "🌍", color: "rgba(160,180,240,0.2)", lines: ["May all beings be happy.", "May all beings be healthy.", "May all beings be at peace.", "May all beings be free from suffering."], note: "Let the circle expand until it has no edge. Every living thing — seen and unseen." },
  ];
  const current = phases[phase];
  return (
    <div className="card">
      <div className="card-title">My Practice 1/2</div>
      <div className="practice-box">
        <div className="practice-name">Loving-Kindness (Metta)</div>
        <p style={{ marginBottom: 18 }}>
          This ancient Buddhist practice — <em>Metta</em> — directs compassion outward in expanding circles. It begins, always, with yourself. Read each phrase slowly. Pause between them. Feel before moving on.
        </p>
        <div style={{ background: current.color, border: "1px solid rgba(255,255,255,0.25)", borderRadius: 18, padding: "24px 20px", marginBottom: 16, transition: "background 0.4s" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{current.emoji}</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 700, color: "#f5f0a0", marginBottom: 18 }}>
            Sending to: {current.to}
          </div>
          {current.lines.map((line, i) => (
            <div key={i} style={{
              padding: "11px 0",
              borderBottom: i < current.lines.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
              fontSize: 17, fontStyle: "italic",
            }}>{line}</div>
          ))}
          <p style={{ marginTop: 16, fontSize: 13, opacity: 0.7, fontStyle: "normal" }}>{current.note}</p>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
          {phases.map((_, i) => (
            <div key={i} onClick={() => setPhase(i)} style={{
              width: 10, height: 10, borderRadius: "50%", cursor: "pointer",
              background: i === phase ? "#f5f0a0" : "rgba(255,255,255,0.3)",
              transition: "all 0.2s",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="timer-btn secondary" onClick={() => setPhase(s => Math.max(0, s - 1))}
            style={{ opacity: phase === 0 ? 0.4 : 1 }} disabled={phase === 0}>← Back</button>
          <button className="timer-btn primary" onClick={() => setPhase(s => Math.min(phases.length - 1, s + 1))}
            style={{ opacity: phase === phases.length - 1 ? 0.4 : 1 }} disabled={phase === phases.length - 1}>Next →</button>
        </div>
      </div>
      <BreathTimer duration={480} />
    </div>
  );
}

function BodyScanPractice() {
  const [step, setStep] = useState(0);
  const steps = [
    { area: "Crown & Forehead", emoji: "🧠", cue: "Let your forehead soften completely. Release any holding around your eyes. Unclench your jaw. Your face is allowed to rest." },
    { area: "Throat & Shoulders", emoji: "🫁", cue: "This is where we carry so much. With your next exhale, let your shoulders drop an inch. Then another. Breathe into any tightness here." },
    { area: "Chest & Heart", emoji: "💛", cue: "Feel your heartbeat. Notice how faithful it is — it has never asked for your permission to keep going. Say thank you silently." },
    { area: "Belly & Hips", emoji: "🌀", cue: "Your gut knows things your mind doesn't. Breathe into your belly — let it be soft and full. Release any holding here." },
    { area: "Legs & Feet", emoji: "🌱", cue: "You carry yourself through the world on these. Feel them heavy, warm, grounded. You are supported. You are held by the earth." },
  ];
  const current = steps[step];
  return (
    <div className="card">
      <div className="card-title">My Practice 2/2</div>
      <div className="practice-box">
        <div className="practice-name">Body Scan</div>
        <p style={{ marginBottom: 18 }}>
          We live so much of life from the neck up. This practice brings you home — to your body, one area at a time. Move slowly. There is no rush. Spend a full breath or two in each place.
        </p>
        <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 18, padding: "24px 20px", marginBottom: 16 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>{current.emoji}</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#f5f0a0", marginBottom: 12 }}>
            {current.area}
          </div>
          <p style={{ lineHeight: 1.75, fontStyle: "italic", fontSize: 15 }}>{current.cue}</p>
          <div style={{ marginTop: 16, background: "rgba(255,255,255,0.1)", borderRadius: 10, height: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((step + 1) / steps.length) * 100}%`, background: "#f5f0a0", transition: "width 0.4s ease", borderRadius: 10 }} />
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8, textAlign: "right" }}>{step + 1} of {steps.length}</div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="timer-btn secondary" onClick={() => setStep(s => Math.max(0, s - 1))}
            style={{ opacity: step === 0 ? 0.4 : 1 }} disabled={step === 0}>← Previous</button>
          <button className="timer-btn primary" onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            style={{ opacity: step === steps.length - 1 ? 0.4 : 1 }} disabled={step === steps.length - 1}>Next Area →</button>
        </div>
      </div>
      <BreathTimer duration={420} />
    </div>
  );
}

function VisualizationPractice() {
  return (
    <div className="card">
      <div className="card-title">My Practice 1/2</div>
      <div className="practice-box">
        <div className="practice-name">Visualization</div>
        <div style={{ fontSize: 52, margin: "14px 0", letterSpacing: 4 }}>🌄✨🧘</div>
        <p style={{ marginBottom: 14 }}>
          Your mind doesn't fully distinguish between something vividly imagined and something real. That is not a flaw — it's a superpower.
        </p>
        <p style={{ marginBottom: 14 }}>
          Close your eyes. Take five slow breaths to settle. Then, let yourself arrive in a place that feels completely safe and deeply peaceful. It can be real or imagined — a forest, a room, a mountain, a place from memory.
        </p>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: "16px 18px", margin: "14px 0", fontStyle: "italic" }}>
          <p style={{ marginBottom: 10 }}>Look around this place with your inner eye. What do you see? What do you hear? What does the air feel like? Is there warmth? Stillness? A particular quality of light?</p>
          <p>Spend time here. Explore. Let your nervous system fully believe you are safe.</p>
        </div>
        <p style={{ opacity: 0.85 }}>
          This place exists inside you always. You can return here in seconds — in a meeting, on a difficult day, in the middle of a crowd. It is yours.
        </p>
      </div>
      <BreathTimer duration={480} />
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center", fontStyle: "italic", marginTop: 8 }}>
        8 minutes — take your time arriving. 🌄
      </p>
    </div>
  );
}

function ManifestationPractice() {
  const [answers, setAnswers] = useState({ vision: "", feeling: "", one: "" });
  const update = (k, v) => setAnswers(prev => ({ ...prev, [k]: v }));
  return (
    <div className="card">
      <div className="card-title">My Practice 2/2</div>
      <div className="practice-box">
        <div className="practice-name">Manifestation</div>
        <div style={{ fontSize: 52, margin: "14px 0" }}>🌟</div>
        <p style={{ marginBottom: 14 }}>
          Manifestation is not magical thinking. It is the practice of getting so clear about what you want — and who you need to become to receive it — that your daily actions naturally align with it.
        </p>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: "16px 18px", margin: "14px 0" }}>
          <p style={{ fontStyle: "italic", marginBottom: 8 }}>Close your eyes. Breathe. Picture your life one year from now — not as a to-do list, but as a <strong>feeling.</strong> What does it feel like to be that version of you?</p>
          <p style={{ fontStyle: "italic" }}>You are not forcing an outcome. You are practicing being at home in the future you are walking toward.</p>
        </div>
      </div>
      <div style={{ marginTop: 4 }}>
        <div className="journal-prompt">The life I am walking toward looks like:</div>
        <textarea className="journal-textarea" rows={4}
          placeholder="Describe it as if it's already true — present tense, sensory details…"
          value={answers.vision} onChange={e => update("vision", e.target.value)} />
        <div className="journal-prompt">The feeling I am cultivating is:</div>
        <textarea className="journal-textarea" rows={2}
          placeholder="e.g. ease, abundance, connection, freedom…"
          value={answers.feeling} onChange={e => update("feeling", e.target.value)} />
        <div className="journal-prompt">One small thing I can do this week that aligns with that vision:</div>
        <textarea className="journal-textarea" rows={2}
          placeholder="Make it concrete and achievable…"
          value={answers.one} onChange={e => update("one", e.target.value)} />
      </div>
      <BreathTimer duration={300} />
    </div>
  );
}

// ---- REFLECTION ----
function Reflection({ data, onChange }) {
  return (
    <div className="card">
      <div className="card-title">Reflection</div>
      <div className="journal-prompt">How am I feeling after my practice:</div>
      <textarea className="journal-textarea" rows={5} placeholder="Notice what shifted..."
        value={data.after || ""} onChange={e => onChange({ ...data, after: e.target.value })} />
      <div className="journal-prompt">Something I want to take away from today:</div>
      <textarea className="journal-textarea" rows={5} placeholder="A word, feeling, or intention..."
        value={data.takeaway || ""} onChange={e => onChange({ ...data, takeaway: e.target.value })} />
    </div>
  );
}

// ---- BRAIN NOTES ----
const BRAIN_NOTES = {
  week1: {
    bubble: "There is no destination here. There is no finish line.",
    callout: (
      <>
        You didn't start this practice to achieve something. You started it to <strong>come home to yourself.</strong>
        <br /><br />
        If your brain was loud today, if you felt distracted or nothing at all — that is the practice. There is no wrong way to show up. The only thing that matters is that you did.
        <br /><br />
        Come back tomorrow. That's it. That's the whole instruction.
      </>
    ),
  },
  week2: {
    bubble: "The only moment that exists is this one.",
    callout: (
      <>
        Right now, as you read this, your breath is happening. Your heart is beating. The present moment is quietly doing its thing — with or without your attention.
        <br /><br />
        Meditation is not about controlling your mind. It's a gentle, daily practice of <strong>returning to now.</strong> Not yesterday's regrets, not tomorrow's worries. Just this breath. Just this moment.
        <br /><br />
        You don't need to get better at it. You just need to keep doing it. 🌿
      </>
    ),
  },
  week3: {
    bubble: "You have already done something remarkable.",
    callout: (
      <>
        Three weeks of showing up for yourself. Three weeks of pausing the noise, even just for five minutes. That is not small — that is <strong>radical self-care.</strong>
        <br /><br />
        You may not feel different yet, and that is completely okay. The changes from meditation are quiet and cumulative — like water slowly shaping stone. Trust the process even when you can't see it.
        <br /><br />
        Keep going. Not because you have to. Because you deserve stillness. 💛
      </>
    ),
  },
  week4: {
    bubble: "Movement is meditation. You are allowed to practice in motion.",
    callout: (
      <>
        For a long time, meditation felt like something you had to sit still for. This week you discovered that stillness is not about the body — it's about where you place your attention.
        <br /><br />
        You can be fully present while walking, while washing dishes, while breathing through a hard moment at work. <strong>The practice doesn't live on a cushion. It lives in you.</strong>
        <br /><br />
        Carry your gratitude with you this week. Notice what it does to how you see things. 🌻
      </>
    ),
  },
  week5: {
    bubble: "The most radical thing you can do is send yourself compassion.",
    callout: (
      <>
        Loving-kindness starts with you — and for most people, that is the hardest part. We are so much gentler with others than with ourselves.
        <br /><br />
        This week, when the inner critic shows up, try this: <strong>"May I be at peace."</strong> Just that. You don't have to mean it fully yet. Say it anyway. That's how it becomes true.
        <br /><br />
        Your body heard everything you said to it this week in the body scan. Keep listening. 🌿
      </>
    ),
  },
  week6: {
    bubble: "You are not dreaming. You are practicing becoming.",
    callout: (
      <>
        Six weeks. You have done six weeks of returning to yourself. That is not a small thing — that is a commitment to your own life.
        <br /><br />
        The vision you held this week? It isn't separate from your meditation practice — it <em>is</em> your meditation practice. Stillness creates the space to hear what you actually want, underneath all the noise.
        <br /><br />
        <strong>This is not the end of the walk. This is just where you found your stride.</strong> Keep going. From my heart to yours — Namaste. 🙏
      </>
    ),
  },
};

function BrainNote({ weekId }) {
  const note = BRAIN_NOTES[weekId] || BRAIN_NOTES.week1;
  return (
    <div className="card">
      <div className="card-title">A gentle reminder</div>
      <div className="card-body">
        If your brain was busy during practice today — that's completely normal. Here's what matters:
      </div>
      <div className="brain-bubble">
        {note.bubble}
      </div>
      <div className="brain-callout">
        {note.callout}
      </div>
    </div>
  );
}

// ---- INTRO ----
function Intro({ onStart, entries }) {
  const weeks = PHASES.filter(p => p.id !== "intro");
  return (
    <div className="intro-card">
      <div className="author-badge">Mayela Zambrano</div>
      <div className="intro-title">The Long Walk</div>
      <div className="intro-subtitle">Your meditation companion</div>
      <div className="intro-phases">
        {weeks.map((w, i) => {
          const weekEntries = entries[w.id] || {};
          const sessionCount = w.sessions?.length || 0;
          const completedCount = Object.keys(weekEntries).length;
          const isComplete = completedCount >= sessionCount;
          return (
            <div key={w.id} className="phase-row" onClick={() => onStart(w.id)}>
              <div className={`phase-dot ${isComplete ? "completed" : ""}`}>
                {isComplete ? "✓" : i + 1}
              </div>
              <div className="phase-info">
                <div className="phase-name">{w.label}</div>
                <div className="phase-sub">{sessionCount} sessions · {completedCount}/{sessionCount} complete</div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>›</span>
            </div>
          );
        })}
      </div>
      <button className="start-btn" onClick={() => onStart("week1")}>Begin Your Practice →</button>
    </div>
  );
}

// ---- SESSION STEP ----
function SessionStep({ weekId, sessionIndex, session, journalData, onJournalChange, onNext, onBack, totalSessions }) {
  const renderContent = () => {
    switch (session.type) {
      case "checkin":
        return <CheckIn data={journalData} onChange={onJournalChange} />;
      case "practice":
        if (session.practiceType === "breath") return <BreathPractice />;
        if (session.practiceType === "smoke") return <SmokePractice />;
        if (session.practiceType === "heart") return <HeartPractice />;
        if (session.practiceType === "space") return <SpacePractice />;
        if (session.practiceType === "walking") return <WalkingPractice />;
        if (session.practiceType === "gratitude") return <GratitudePractice />;
        if (session.practiceType === "lovingkindness") return <LovingKindnessPractice />;
        if (session.practiceType === "bodyscan") return <BodyScanPractice />;
        if (session.practiceType === "visualization") return <VisualizationPractice />;
        if (session.practiceType === "manifestation") return <ManifestationPractice />;
        break;
      case "reflection":
        return <Reflection data={journalData} onChange={onJournalChange} />;
      case "note":
        return <BrainNote weekId={weekId} />;
      default:
        return null;
    }
  };

  const isLast = sessionIndex === totalSessions - 1;

  return (
    <div>
      <div className="top-nav">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <span className="step-indicator">{session.label} · {sessionIndex + 1}/{totalSessions}</span>
      </div>
      {renderContent()}
      <button className="next-btn" onClick={onNext}>
        {isLast ? "Complete Week ✓" : `Next: ${PHASES.find(p => p.id === weekId)?.sessions[sessionIndex + 1]?.label || "Next"} →`}
      </button>
    </div>
  );
}

// ---- WEEK COMPLETE ----
function WeekComplete({ weekLabel, onContinue, onHome }) {
  return (
    <div className="card completion-card">
      <span className="completion-emoji">🌸</span>
      <div className="completion-title">{weekLabel} Complete!</div>
      <p className="completion-text">
        Beautiful work. Each session you show up is a step closer to your authentic self.
        Remember — this is a practice, not a performance. Namaste. 🙏
      </p>
      <button className="next-btn" onClick={onContinue} style={{ marginBottom: 12 }}>Continue to Next Week →</button>
      <button className="back-btn" style={{ width: "100%", textAlign: "center", display: "block", padding: 14 }} onClick={onHome}>← Return to Journal Home</button>
    </div>
  );
}

// ---- MAIN APP ----
export default function MeditationJournal() {
  const [view, setView] = useState("intro"); // intro | session | week-complete
  const [currentWeekId, setCurrentWeekId] = useState("week1");
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem("the-long-walk-entries");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [savedIndicator, setSavedIndicator] = useState(false);

  const weekData = PHASES.find(p => p.id === currentWeekId);

  useEffect(() => {
    localStorage.setItem("the-long-walk-entries", JSON.stringify(entries));
  }, [entries]);

  const updateJournal = (weekId, sessionIndex, data) => {
    setEntries(prev => ({
      ...prev,
      [weekId]: { ...(prev[weekId] || {}), [sessionIndex]: data }
    }));
    setSavedIndicator(true);
    setTimeout(() => setSavedIndicator(false), 1500);
  };

  const getJournalData = (weekId, sessionIndex) => {
    return entries[weekId]?.[sessionIndex] || {};
  };

  const handleStart = (weekId) => {
    setCurrentWeekId(weekId);
    setCurrentSessionIndex(0);
    setView("session");
  };

  const handleNext = () => {
    const sessions = weekData?.sessions || [];
    if (currentSessionIndex < sessions.length - 1) {
      setCurrentSessionIndex(i => i + 1);
    } else {
      setView("week-complete");
    }
  };

  const handleBack = () => {
    if (currentSessionIndex > 0) {
      setCurrentSessionIndex(i => i - 1);
    } else {
      setView("intro");
    }
  };

  const handleContinue = () => {
    const weeks = PHASES.filter(p => p.id !== "intro");
    const currentIdx = weeks.findIndex(w => w.id === currentWeekId);
    if (currentIdx < weeks.length - 1) {
      handleStart(weeks[currentIdx + 1].id);
    } else {
      setView("intro");
    }
  };

  const currentSession = weekData?.sessions[currentSessionIndex];

  return (
    <div className="app">
      <div className="container">
        {view === "intro" && <Intro onStart={handleStart} entries={entries} />}
        {view === "session" && currentSession && (
          <SessionStep
            weekId={currentWeekId}
            sessionIndex={currentSessionIndex}
            session={currentSession}
            journalData={getJournalData(currentWeekId, currentSessionIndex)}
            onJournalChange={(data) => updateJournal(currentWeekId, currentSessionIndex, data)}
            onNext={handleNext}
            onBack={handleBack}
            totalSessions={weekData?.sessions?.length || 0}
          />
        )}
        {view === "week-complete" && (
          <WeekComplete
            weekLabel={weekData?.label}
            onContinue={handleContinue}
            onHome={() => setView("intro")}
          />
        )}
        {savedIndicator && (
          <div style={{
            position: "fixed", bottom: 24, right: 24,
            background: "rgba(100,220,140,0.9)", color: "#004020",
            borderRadius: 12, padding: "10px 18px", fontWeight: 700,
            fontSize: 14, boxShadow: "0 4px 16px rgba(0,100,50,0.3)",
            backdropFilter: "blur(8px)"
          }}>
            ✓ Saved
          </div>
        )}
      </div>
    </div>
  );
}
