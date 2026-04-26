import "./styles/blueprint.css";
import Onboarding from "./pages/Onboarding";
import React, { useState, useEffect, useRef } from "react";
import Landing from "./pages/Landing";
import ScoreRing from "./components/ScoreRing";
import {
  Flame, Camera, MessageCircle, Target, Trophy, Check, ChevronRight,
  Crown, User, Send, ArrowUp, Home, BarChart3, Users, ArrowRight,
  Plus, Upload, X, Eye, Sparkles, Zap, Award, Radio, Settings
} from "lucide-react";

// ================================================================
// BLUEPRINT · v3
// Aesthetic: black, white, blue. Editorial serif display, geometric
// sans for UI, mono for technical marks. Quiet confidence. Private
// members' club energy. No military LARP — just precision.
// ================================================================

const BlueprintApp = () => {
  const [view, setView] = useState("landing");
  const [onboardStep, setOnboardStep] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [streak, setStreak] = useState(12);
  const [scores, setScores] = useState({ overall: 71, face: 68, style: 74, profile: 62, text: 77, confidence: 70 });
  const [missions, setMissions] = useState([
    { id: 1, title: "One photograph in golden-hour light. No filters, no poses.", pts: 8, done: false, category: "Image" },
    { id: 2, title: "Send the opener template to three recent matches.", pts: 12, done: true, category: "Signal" },
    { id: 3, title: "Posture reset: four minutes, twice today.", pts: 5, done: false, category: "Frame" },
  ]);
  const [chatMessages, setChatMessages] = useState([
    { role: "coach", text: "I looked at the Mara thread. You hedged on the callback — that's why she stalled. It isn't charisma that closes. It's conviction. Shall I rewrite the line?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratedPhoto, setRatedPhoto] = useState(null);

  const chatEndRef = useRef(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const toggleMission = (id) => {
    setMissions(missions.map(m => {
      if (m.id === id && !m.done) {
        setScores(s => ({ ...s, overall: Math.min(100, s.overall + 1) }));
        return { ...m, done: true };
      }
      return m;
    }));
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(p => [...p, { role: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      const res = [
        "Stop asking. Lead. 'Thursday, 8pm, wine bar on 4th. Say yes.' Declarative. Short. Either she meets you or she doesn't — and either way you know.",
        "Your opener is doing too much work. Cut it in half. Curiosity beats cleverness. She should wonder, not laugh.",
        "That's a conviction problem wearing a text problem's clothes. Rule: one line. Then silence. Let it do the heavy lifting.",
        "Good instinct. Send it. If she doesn't answer in 48 hours, you move on. Chasing is the anti-signal — she can feel weakness through the screen.",
      ];
      setChatMessages(p => [...p, { role: "coach", text: res[Math.floor(Math.random() * res.length)] }]);
    }, 700);
  };

  const handlePhotoRate = () => {
    setShowRatingModal(true);
    setTimeout(() => {
      setRatedPhoto({
        score: 73,
        verdict: "Viable anchor frame",
        positives: ["Directional lighting from the left", "Unforced expression", "Clean negative space behind you"],
        negatives: ["Crop is too tight at the shoulders", "Shirt colour desaturates your skin"],
        action: "Recrop at 4:5. Reshoot in the olive tee. Expect roughly +9 on the rebuild.",
      });
    }, 1800);
  };

 

  // ============ APP INTERIOR ============

  const HomeTab = () => (
    <div style={{ padding: "48px 56px", maxWidth: 1280, margin: "0 auto" }} className="bp-fade-up">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, paddingBottom: 28, borderBottom: "1px solid var(--line)" }}>
        <div>
          <div className="bp-label">FRIDAY · 17 APRIL 2026</div>
          <h1 className="bp-serif" style={{ fontSize: 52, fontWeight: 300, margin: "14px 0 0", lineHeight: 1, letterSpacing: "-0.035em" }}>
            Good morning, <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>Daniel</em>.
          </h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ padding: "14px 20px", background: "var(--ink-2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12 }}>
            <Flame size={15} style={{ color: "var(--blue-bright)" }} strokeWidth={1.5}/>
            <div>
              <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)" }}>STREAK</div>
              <div className="bp-serif" style={{ fontSize: 20, lineHeight: 1 }}>{streak} days</div>
            </div>
          </div>
          <div style={{ padding: "14px 20px", background: "var(--ink-2)", border: "1px solid var(--blue-deep)", display: "flex", alignItems: "center", gap: 12 }}>
            <Award size={15} style={{ color: "var(--blue-bright)" }} strokeWidth={1.5}/>
            <div>
              <div className="bp-mono" style={{ fontSize: 9, color: "var(--blue-bright)" }}>TIER</div>
              <div className="bp-serif" style={{ fontSize: 20, lineHeight: 1 }}>IV</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Score */}
        <div className="bp-card" style={{ padding: 40, position: "relative" }}>
          <div className="bp-corner bp-corner-tl" />
          <div className="bp-corner bp-corner-br" />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <div className="bp-label">Assessment</div>
              <div className="bp-mono" style={{ fontSize: 11, color: "var(--blue-bright)", marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <ArrowUp size={11} strokeWidth={2}/> +3 this week
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)" }}>PERCENTILE</div>
              <div className="bp-serif" style={{ fontSize: 22, fontWeight: 400, color: "var(--blue-bright)" }}>72</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <div style={{ position: "relative", width: 180, height: 180 }}>
              <ScoreRing value={scores.overall}/>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="bp-serif" style={{ fontSize: 80, fontWeight: 300, lineHeight: 1, color: "var(--white)", letterSpacing: "-0.04em" }}>
                  {scores.overall}
                </div>
                <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", marginTop: 4, letterSpacing: "0.2em" }}>OF 100</div>
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              {[["Face", scores.face], ["Style", scores.style], ["Profile", scores.profile], ["Dialogue", scores.text], ["Presence", scores.confidence]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: "var(--white-dim)" }}>{k}</span>
                    <span className="bp-mono" style={{ color: v >= 70 ? "var(--blue-bright)" : "var(--white)" }}>{String(v).padStart(2, "0")}</span>
                  </div>
                  <div className="bp-bar"><div className="bp-bar-fill" style={{ width: `${v}%` }}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practice */}
        <div className="bp-card" style={{ padding: 40, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
            <div className="bp-label">Today's practice</div>
            <div className="bp-mono" style={{ fontSize: 11, color: "var(--blue-bright)" }}>
              {missions.filter(m => m.done).length} / {missions.length}
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            {missions.map((m) => (
              <div key={m.id} onClick={() => toggleMission(m.id)}
                style={{
                  padding: 20,
                  background: m.done ? "var(--ink-3)" : "var(--ink)",
                  border: m.done ? "1px solid var(--blue-deep)" : "1px solid var(--line)",
                  display: "flex", gap: 16, cursor: "pointer",
                  transition: "all 0.25s", opacity: m.done ? 0.55 : 1,
                }}
                onMouseEnter={e => !m.done && (e.currentTarget.style.borderColor = "var(--blue)")}
                onMouseLeave={e => !m.done && (e.currentTarget.style.borderColor = "var(--line)")}
              >
                <div style={{ marginTop: 1 }}>
                  {m.done
                    ? <div style={{ width: 16, height: 16, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={11} strokeWidth={2.5} style={{ color: "var(--ink)" }}/>
                      </div>
                    : <div style={{ width: 16, height: 16, border: "1px solid var(--gray-low)" }}/>
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div className="bp-mono" style={{ fontSize: 9, color: "var(--blue-bright)", marginBottom: 6, letterSpacing: "0.15em" }}>
                    {m.category.toUpperCase()} · +{m.pts}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--white-dim)", textDecoration: m.done ? "line-through" : "none", fontWeight: 300 }}>
                    {m.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo lab + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div className="bp-card" style={{ padding: 44, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 240, height: "100%", background: "radial-gradient(ellipse at right, rgba(59, 108, 255, 0.12), transparent 60%)" }}/>
          <div style={{ position: "relative" }}>
            <div className="bp-label">Photograph studio</div>
            <h3 className="bp-serif" style={{ fontSize: 38, margin: "16px 0 16px", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              Upload a frame. <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>Receive the verdict</em> in eight seconds.
            </h3>
            <p style={{ color: "var(--white-dim)", fontSize: 14, margin: "0 0 32px", maxWidth: 480, fontWeight: 300, lineHeight: 1.65 }}>
              Per-frame scoring. Specific feedback. The one adjustment that moves it ten points.
            </p>
            <button className="bp-btn bp-btn-blue" onClick={handlePhotoRate}>
              <Upload size={13} strokeWidth={1.8}/> Upload photograph
            </button>
          </div>
        </div>

        <div className="bp-card" style={{ padding: 28 }}>
          <div className="bp-label" style={{ marginBottom: 20 }}>Recent</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { t: "Photograph scored", d: "Frame 04 · 82 / 100" },
              { t: "Practice complete", d: "Opener deployed × 3" },
              { t: "Coach review", d: "Mara thread · rewritten" },
              { t: "Streak +1", d: "Day 12 · holding" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 16, borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                <div style={{ width: 1, background: "var(--blue)", alignSelf: "stretch" }}/>
                <div>
                  <div style={{ fontSize: 13, color: "var(--white-dim)", fontWeight: 400 }}>{a.t}</div>
                  <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", marginTop: 4 }}>{a.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CoachTab = () => (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", maxWidth: 940, margin: "0 auto", padding: "48px 56px 0" }}>
      <div style={{ paddingBottom: 28, borderBottom: "1px solid var(--line)", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <div className="bp-label">Coach · private channel</div>
          <h1 className="bp-serif" style={{ fontSize: 52, fontWeight: 300, margin: "14px 0 0", lineHeight: 1, letterSpacing: "-0.035em" }}>
            Say it <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>straight</em>.
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 6, height: 6, background: "var(--blue)", borderRadius: "50%", animation: "bp-pulse 2s infinite" }}/>
          <span className="bp-mono" style={{ fontSize: 10, color: "var(--blue-bright)", letterSpacing: "0.18em" }}>CHANNEL OPEN</span>
        </div>
      </div>

      <div className="bp-scroll" style={{ flex: 1, overflowY: "auto", paddingBottom: 32 }}>
        {chatMessages.map((m, i) => (
          <div key={i} className="bp-fade-up" style={{ marginBottom: 28, display: "flex", gap: 18, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
            <div style={{
              width: 36, height: 36, flexShrink: 0,
              border: m.role === "coach" ? "1px solid var(--blue)" : "1px solid var(--line)",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--ink-2)",
            }}>
              {m.role === "coach"
                ? <div style={{ width: 12, height: 12, border: "1px solid var(--blue-bright)", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 2, background: "var(--blue-bright)" }}/>
                  </div>
                : <User size={14} style={{ color: "var(--gray)" }} strokeWidth={1.5}/>
              }
            </div>
            <div style={{ maxWidth: "72%" }}>
              <div className="bp-mono" style={{ fontSize: 10, color: m.role === "coach" ? "var(--blue-bright)" : "var(--gray-low)", marginBottom: 8, textAlign: m.role === "user" ? "right" : "left", letterSpacing: "0.18em" }}>
                {m.role === "coach" ? "BLUEPRINT" : "YOU"}
              </div>
              <div style={{
                padding: "18px 22px",
                background: m.role === "coach" ? "var(--ink-2)" : "var(--ink-3)",
                border: m.role === "coach" ? "1px solid var(--line-bright)" : "1px solid var(--line)",
                fontSize: 15, lineHeight: 1.7, fontWeight: 300, color: "var(--white-dim)",
              }}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}/>
      </div>

      <div style={{ padding: "20px 0 40px", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["Review my last thread", "What's the next move?", "Rewrite my bio", "I got rejected"].map((q, i) => (
            <button key={i} className="bp-btn bp-btn-ghost" style={{ padding: "9px 16px", fontSize: 12 }}
              onClick={() => setChatInput(q)}>
              {q}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <input className="bp-input"
            placeholder="Paste a thread, ask anything..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            style={{ flex: 1 }}
          />
          <button className="bp-btn bp-btn-blue" onClick={sendMessage} style={{ padding: "14px 22px" }}>
            <Send size={14} strokeWidth={1.8}/>
          </button>
        </div>
      </div>
    </div>
  );

  const ProgressTab = () => {
    const history = [62, 63, 63, 65, 66, 64, 67, 68, 68, 69, 70, 71];
    return (
      <div style={{ padding: "48px 56px", maxWidth: 1280, margin: "0 auto" }} className="bp-fade-up">
        <div style={{ paddingBottom: 28, borderBottom: "1px solid var(--line)", marginBottom: 40 }}>
          <div className="bp-label">§ Progress</div>
          <h1 className="bp-serif" style={{ fontSize: 52, fontWeight: 300, margin: "14px 0 0", lineHeight: 1, letterSpacing: "-0.035em" }}>
            Twelve days of <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>measurable</em> change.
          </h1>
        </div>

        <div className="bp-card" style={{ padding: 40, marginBottom: 20, position: "relative" }}>
          <div className="bp-corner bp-corner-tl"/>
          <div className="bp-corner bp-corner-br"/>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 36 }}>
            <div>
              <div className="bp-label">Trajectory</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 12 }}>
                <span className="bp-serif" style={{ fontSize: 88, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.04em" }}>71</span>
                <span className="bp-mono" style={{ fontSize: 12, color: "var(--blue-bright)" }}>+9 from day 01</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              <div>
                <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)" }}>PEAK</div>
                <div className="bp-serif" style={{ fontSize: 26, fontWeight: 400 }}>71</div>
              </div>
              <div>
                <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)" }}>BASELINE</div>
                <div className="bp-serif" style={{ fontSize: 26, fontWeight: 400 }}>62</div>
              </div>
            </div>
          </div>

          <svg viewBox="0 0 600 200" style={{ width: "100%", height: 220 }}>
            <defs>
              <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b6cff" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b6cff" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map(i => (
              <line key={i} x1="0" x2="600" y1={50 * i} y2={50 * i} stroke="#1e1e27" strokeWidth="0.5" strokeDasharray="2 6"/>
            ))}
            <path
              d={`M 0 ${200 - (history[0] - 50) * 3} ${history.map((v, i) => `L ${i * (600 / (history.length - 1))} ${200 - (v - 50) * 3}`).join(" ")} L 600 200 L 0 200 Z`}
              fill="url(#area)"
            />
            <path
              d={`M 0 ${200 - (history[0] - 50) * 3} ${history.map((v, i) => `L ${i * (600 / (history.length - 1))} ${200 - (v - 50) * 3}`).join(" ")}`}
              fill="none" stroke="#5f8aff" strokeWidth="1.5"
            />
            {history.map((v, i) => (
              <g key={i}>
                <circle cx={i * (600 / (history.length - 1))} cy={200 - (v - 50) * 3} r="3" fill="#050507" stroke="#5f8aff" strokeWidth="1.5"/>
                {i === history.length - 1 && (
                  <circle cx={i * (600 / (history.length - 1))} cy={200 - (v - 50) * 3} r="8" fill="none" stroke="#5f8aff" strokeWidth="0.8" opacity="0.6">
                    <animate attributeName="r" from="3" to="14" dur="1.8s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.7" to="0" dur="1.8s" repeatCount="indefinite"/>
                  </circle>
                )}
              </g>
            ))}
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            {["Day 01", "Day 04", "Day 08", "Day 12"].map(d => (
              <span key={d} className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", letterSpacing: "0.12em" }}>{d.toUpperCase()}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { label: "Match rate", value: "12%", change: "+4%", icon: Target },
            { label: "Reply rate", value: "61%", change: "+11%", icon: MessageCircle },
            { label: "Date conversion", value: "24%", change: "+7%", icon: Trophy },
          ].map((s, i) => (
            <div key={i} className="bp-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
                <div className="bp-label">{s.label}</div>
                <s.icon size={14} style={{ color: "var(--gray-low)" }} strokeWidth={1.4}/>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span className="bp-serif" style={{ fontSize: 56, fontWeight: 300, letterSpacing: "-0.04em" }}>{s.value}</span>
                <span className="bp-mono" style={{ fontSize: 11, color: "var(--blue-bright)" }}>{s.change}</span>
              </div>
              <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", marginTop: 14, letterSpacing: "0.15em" }}>
                VS 14-DAY BASELINE
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CommunityTab = () => (
    <div style={{ padding: "48px 56px", maxWidth: 1040, margin: "0 auto" }} className="bp-fade-up">
      <div style={{ paddingBottom: 28, borderBottom: "1px solid var(--line)", marginBottom: 40 }}>
        <div className="bp-label">§ Cohort</div>
        <h1 className="bp-serif" style={{ fontSize: 52, fontWeight: 300, margin: "14px 0 0", lineHeight: 1, letterSpacing: "-0.035em" }}>
          Men who <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>shipped</em> this week.
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { name: "Marcus K.", days: 47, tier: "VI", win: "Third date confirmed. The bio rewrite changed everything — went from one match a week to eight. The system works if you run it.", score: 84, delta: 19 },
          { name: "Ray P.", days: 23, tier: "IV", win: "Sent the direct callback. She said yes in twelve minutes. The coach was right — the hedge words were bleeding me dry.", score: 72, delta: 11 },
          { name: "Anonymous", days: 9, tier: "III", win: "First match in four months. Not who I'd have picked — but it feels good to just be seen. Holding the streak.", score: 65, delta: 6 },
          { name: "Tom V.", days: 61, tier: "VII", win: "Engaged. Started Blueprint last year after a hard breakup. Thank you for the framing work. Signing off.", score: 88, delta: 24 },
        ].map((w, i) => (
          <div key={i} className="bp-card" style={{ padding: 28, display: "flex", gap: 24, alignItems: "start", position: "relative" }}>
            <div style={{ width: 56, height: 56, border: "1px solid var(--line-bright)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--ink)" }}>
              <div className="bp-serif" style={{ fontSize: 22, fontWeight: 400, color: "var(--blue-bright)" }}>{w.name[0]}</div>
              <div className="bp-mono" style={{ fontSize: 8, color: "var(--gray-low)", marginTop: 2, letterSpacing: "0.1em" }}>TIER {w.tier}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div className="bp-serif" style={{ fontSize: 18, fontWeight: 400 }}>{w.name}</div>
                  <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", marginTop: 4, letterSpacing: "0.12em" }}>
                    DAY {w.days} · SCORE <span style={{ color: "var(--blue-bright)" }}>{w.score}</span> · <span style={{ color: "var(--blue-bright)" }}>+{w.delta}</span>
                  </div>
                </div>
                <button style={{ background: "none", border: "1px solid var(--line)", padding: "6px 12px", color: "var(--gray)", fontSize: 10, fontFamily: "JetBrains Mono", cursor: "pointer", letterSpacing: "0.1em" }}>
                  ◦ 47
                </button>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--white-dim)", lineHeight: 1.7, fontWeight: 300 }}>{w.win}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: 32, border: "1px dashed var(--line-bright)", textAlign: "center" }}>
        <div className="bp-label" style={{ marginBottom: 16 }}>Share your progress</div>
        <button className="bp-btn bp-btn-ghost">
          <Plus size={13} strokeWidth={1.8}/> Post to the cohort
        </button>
      </div>
    </div>
  );

  const AppInterior = () => (
    <div className="bp-root" style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{
        width: 260, background: "var(--ink-2)", borderRight: "1px solid var(--line)",
        padding: "28px 0", display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ padding: "0 28px 28px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 14 }}>
          <div className="bp-mark" style={{ width: 26, height: 26 }} />
          <div>
            <div className="bp-serif" style={{ fontSize: 17, fontWeight: 400 }}>Blueprint</div>
            <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)", marginTop: 1, letterSpacing: "0.1em" }}>CORE · DAY 12</div>
          </div>
        </div>

        <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, border: "1px solid var(--line-bright)", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)" }}>
              <span className="bp-serif" style={{ fontSize: 18, fontWeight: 400, color: "var(--blue-bright)" }}>D</span>
            </div>
            <div>
              <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)", letterSpacing: "0.12em" }}>MEMBER 0047</div>
              <div className="bp-serif" style={{ fontSize: 15, fontWeight: 400, marginTop: 1 }}>Daniel R.</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="bp-mono" style={{ fontSize: 10, color: "var(--gray)", letterSpacing: "0.12em" }}>TIER IV</span>
              <span className="bp-mono" style={{ fontSize: 10, color: "var(--blue-bright)" }}>71</span>
            </div>
            <div className="bp-bar"><div className="bp-bar-fill" style={{ width: "71%" }}/></div>
          </div>
        </div>

        <nav style={{ padding: "20px 0", flex: 1 }}>
          {[
            { id: "home", icon: Home, label: "Dashboard" },
            { id: "coach", icon: Radio, label: "Coach" },
            { id: "progress", icon: BarChart3, label: "Progress" },
            { id: "community", icon: Users, label: "Cohort" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                width: "100%", padding: "14px 28px",
                background: activeTab === t.id ? "var(--ink-3)" : "transparent",
                border: "none",
                borderLeft: activeTab === t.id ? "1px solid var(--blue)" : "1px solid transparent",
                color: activeTab === t.id ? "var(--white)" : "var(--gray)",
                display: "flex", alignItems: "center", gap: 14,
                fontSize: 13, cursor: "pointer",
                fontFamily: "'Manrope', sans-serif", fontWeight: 400,
                letterSpacing: "0.01em", transition: "all 0.2s",
              }}>
              <t.icon size={14} strokeWidth={1.5}/>
              {t.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "24px 28px 0", borderTop: "1px solid var(--line)" }}>
          <div className="bp-label" style={{ marginBottom: 14 }}>Upgrade</div>
          <div style={{ padding: 18, background: "var(--ink-3)", border: "1px solid var(--blue-deep)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Crown size={13} style={{ color: "var(--blue-bright)" }} strokeWidth={1.5}/>
              <span className="bp-serif" style={{ fontSize: 16, fontWeight: 400 }}>Pro tier</span>
            </div>
            <p style={{ margin: "0 0 14px", fontSize: 11, color: "var(--white-dim)", lineHeight: 1.6, fontWeight: 300 }}>
              Real-time date mode. Monthly coach review.
            </p>
            <button className="bp-btn bp-btn-blue" style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: 11 }}>
              Subscribe
            </button>
          </div>
          <button onClick={() => setView("landing")}
            style={{ marginTop: 20, background: "none", border: "none", color: "var(--gray-low)", fontSize: 10, cursor: "pointer", fontFamily: "JetBrains Mono", padding: 0, letterSpacing: "0.15em" }}>
            ← EXIT
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, background: "var(--ink)", display: "flex", flexDirection: "column" }}>
        {activeTab === "home" && <HomeTab/>}
        {activeTab === "coach" && <CoachTab/>}
        {activeTab === "progress" && <ProgressTab/>}
        {activeTab === "community" && <CommunityTab/>}
      </main>

      {/* Photo rating modal */}
      {showRatingModal && (
        <div onClick={() => { setShowRatingModal(false); setRatedPhoto(null); }}
          style={{ position: "fixed", inset: 0, background: "rgba(5, 5, 7, 0.85)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div onClick={e => e.stopPropagation()} className="bp-card bp-fade-up"
            style={{ maxWidth: 600, width: "100%", padding: 48, background: "var(--ink-2)", position: "relative" }}>
            <div className="bp-corner bp-corner-tl"/>
            <div className="bp-corner bp-corner-tr"/>
            <div className="bp-corner bp-corner-bl"/>
            <div className="bp-corner bp-corner-br"/>
            <button onClick={() => { setShowRatingModal(false); setRatedPhoto(null); }}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "1px solid var(--line)", padding: 8, color: "var(--gray)", cursor: "pointer" }}>
              <X size={13} strokeWidth={1.5}/>
            </button>

            {!ratedPhoto ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 100, height: 100, border: "1px solid var(--blue)", margin: "0 auto 32px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(59, 108, 255, 0.2), transparent)", backgroundSize: "200% 100%", animation: "bp-shimmer 1.8s infinite" }}/>
                  <Camera size={28} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "var(--blue-bright)" }} strokeWidth={1.3}/>
                </div>
                <div className="bp-label bp-label-blue" style={{ marginBottom: 14 }}>Analysing</div>
                <div className="bp-serif" style={{ fontSize: 30, fontWeight: 400, letterSpacing: "-0.02em" }}>Reading the frame</div>
                <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", marginTop: 20, letterSpacing: "0.18em" }}>
                  LIGHT · COMPOSITION · EXPRESSION · STYLE
                </div>
              </div>
            ) : (
              <>
                <div className="bp-label bp-label-blue" style={{ marginBottom: 12 }}>Verdict · frame 04</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 6 }}>
                  <span className="bp-serif" style={{ fontSize: 96, fontWeight: 300, color: "var(--white)", lineHeight: 1, letterSpacing: "-0.045em" }}>
                    {ratedPhoto.score}
                  </span>
                  <span className="bp-serif" style={{ fontSize: 22, fontWeight: 400, fontStyle: "italic", color: "var(--blue-bright)" }}>{ratedPhoto.verdict}</span>
                </div>
                <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", marginBottom: 32, letterSpacing: "0.15em" }}>
                  PERCENTILE 78 · ACTIVE COHORT
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div className="bp-label" style={{ marginBottom: 14, color: "var(--blue-bright)" }}>What works</div>
                  {ratedPhoto.positives.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", fontSize: 14, color: "var(--white-dim)", borderBottom: "1px solid var(--line)", fontWeight: 300 }}>
                      <Check size={13} style={{ color: "var(--blue-bright)", marginTop: 4 }} strokeWidth={2}/>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 28 }}>
                  <div className="bp-label" style={{ marginBottom: 14, color: "var(--gray)" }}>What to adjust</div>
                  {ratedPhoto.negatives.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", fontSize: 14, color: "var(--white-dim)", borderBottom: "1px solid var(--line)", fontWeight: 300 }}>
                      <X size={13} style={{ color: "var(--gray)", marginTop: 4 }} strokeWidth={2}/>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: 24, background: "var(--ink)", border: "1px solid var(--blue)", marginBottom: 28, position: "relative" }}>
                  <div className="bp-corner bp-corner-tl" style={{ width: 8, height: 8 }}/>
                  <div className="bp-corner bp-corner-br" style={{ width: 8, height: 8 }}/>
                  <div className="bp-label bp-label-blue" style={{ marginBottom: 12 }}>The move</div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--white-dim)", fontWeight: 300 }}>{ratedPhoto.action}</div>
                </div>

                <button className="bp-btn bp-btn-blue" style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => { setShowRatingModal(false); setRatedPhoto(null); }}>
                  Understood
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
  <>
    {view === "landing" && <Landing setView={setView} />}

    {view === "onboarding" && (
      <Onboarding
        onboardStep={onboardStep}
        setOnboardStep={setOnboardStep}
        setView={setView}
      />
    )}

    {view === "app" && <AppInterior />}
  </>
);
};

export default BlueprintApp;
