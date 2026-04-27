import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Camera,
  Check,
  Crown,
  Home,
  MessageCircle,
  Radio,
  Send,
  Target,
  Trophy,
  Upload,
  Users,
  X,
} from "lucide-react";

function ScoreRing({ value, size = 180 }) {
  const radius = size / 2 - 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="bp-score-ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--line)"
        strokeWidth="1"
        fill="none"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--blue-bright)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
    </svg>
  );
}

export default function AppInterior({ onLogout }) {
  const [activeTab, setActiveTab] = useState("home");

  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Rewrite your first prompt using one concrete story.",
      category: "Profile",
      pts: 4,
      done: false,
    },
    {
      id: 2,
      title: "Photograph one outfit in natural light.",
      category: "Style",
      pts: 3,
      done: true,
    },
    {
      id: 3,
      title: "Send one direct callback instead of a safe question.",
      category: "Dialogue",
      pts: 5,
      done: false,
    },
  ]);

  const [chatInput, setChatInput] = useState("");

  const [chatMessages, setChatMessages] = useState([
    {
      role: "coach",
      text: "Paste a thread, describe the situation, or ask for the next move. I will be direct.",
    },
  ]);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratedPhoto, setRatedPhoto] = useState(null);

  const chatEndRef = useRef(null);

  const scores = {
    overall: 71,
    face: 68,
    style: 74,
    profile: 62,
    text: 77,
    confidence: 70,
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function toggleMission(id) {
    setMissions((currentMissions) =>
      currentMissions.map((mission) =>
        mission.id === id ? { ...mission, done: !mission.done } : mission
      )
    );
  }

  function sendMessage() {
    const cleanInput = chatInput.trim();

    if (!cleanInput) {
      return;
    }

    setChatMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "user",
        text: cleanInput,
      },
    ]);

    setChatInput("");

    setTimeout(() => {
      setChatMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "coach",
          text: "Good. The pattern is clear: you are over-explaining before there is enough tension. Cut the justification, keep the frame, and make the next line specific.",
        },
      ]);
    }, 700);
  }

  function handlePhotoRate() {
    setShowRatingModal(true);
    setRatedPhoto(null);

    setTimeout(() => {
      setRatedPhoto({
        score: 82,
        verdict: "Strong frame",
        positives: [
          "The lighting gives your face structure.",
          "Your posture reads composed instead of performative.",
          "The outfit has enough contrast to separate you from the background.",
        ],
        negatives: [
          "The expression is slightly guarded.",
          "The background competes with your silhouette.",
          "The angle could be cleaner if shot from chest height.",
        ],
        action:
          "Retake this frame near a plain wall, keep the same outfit, lower your chin slightly, and relax the mouth. That should move the frame closer to 88.",
      });
    }, 1400);
  }

  function HomeTab() {
    return (
      <div className="bp-fade-up" style={{ padding: "48px 56px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, paddingBottom: 28, borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="bp-label">TODAY</div>
            <h1 className="bp-serif" style={{ fontSize: 52, fontWeight: 300, margin: "14px 0 0", lineHeight: 1, letterSpacing: "-0.035em" }}>
              Good morning, <em style={{ color: "var(--blue-bright)" }}>Daniel</em>.
            </h1>
          </div>

          <div className="bp-label bp-label-blue">DAY 12 · STREAK ACTIVE</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 }}>
          <div className="bp-card" style={{ padding: 32, position: "relative" }}>
            <div className="bp-corner bp-corner-tl" />
            <div className="bp-corner bp-corner-br" />

            <div className="bp-label" style={{ marginBottom: 24 }}>
              Overall assessment
            </div>

            <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 28px" }}>
              <ScoreRing value={scores.overall} />

              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <div className="bp-serif" style={{ fontSize: 52, color: "var(--blue-bright)", lineHeight: 1 }}>
                  {scores.overall}
                </div>
                <div className="bp-mono" style={{ fontSize: 10, color: "var(--gray-low)", letterSpacing: "0.16em" }}>
                  TIER IV
                </div>
              </div>
            </div>

            {[
              ["Face", scores.face],
              ["Style", scores.style],
              ["Profile", scores.profile],
              ["Text", scores.text],
              ["Confidence", scores.confidence],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "var(--white-dim)", fontSize: 13 }}>{label}</span>
                  <span className="bp-mono" style={{ color: "var(--blue-bright)", fontSize: 11 }}>{value}</span>
                </div>
                <div className="bp-bar">
                  <div className="bp-bar-fill" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="bp-card" style={{ padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <div>
                <div className="bp-label">Mission queue</div>
                <h2 className="bp-serif" style={{ fontSize: 34, fontWeight: 300, margin: "8px 0 0" }}>
                  Today's work
                </h2>
              </div>

              <Target size={22} style={{ color: "var(--blue-bright)" }} strokeWidth={1.5} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {missions.map((mission) => (
                <button
                  key={mission.id}
                  onClick={() => toggleMission(mission.id)}
                  style={{
                    border: "1px solid var(--line)",
                    background: mission.done ? "rgba(59, 108, 255, 0.08)" : "var(--ink-2)",
                    color: "var(--white)",
                    padding: 20,
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      border: mission.done ? "1px solid var(--blue-bright)" : "1px solid var(--line-bright)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {mission.done && <Check size={14} style={{ color: "var(--blue-bright)" }} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="bp-mono" style={{ fontSize: 9, color: "var(--blue-bright)", letterSpacing: "0.14em", marginBottom: 6 }}>
                      {mission.category.toUpperCase()} · +{mission.pts} PTS
                    </div>

                    <div style={{ color: "var(--white-dim)", fontSize: 15 }}>
                      {mission.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handlePhotoRate}
              className="bp-btn bp-btn-blue"
              style={{ marginTop: 28 }}
            >
              <Camera size={14} /> Rate a photo
            </button>
          </div>
        </div>
      </div>
    );
  }

  function CoachTab() {
    return (
      <div className="bp-fade-up" style={{ padding: "48px 56px", maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: 36 }}>
          <div className="bp-label bp-label-blue">Private coach</div>
          <h1 className="bp-serif" style={{ fontSize: 56, fontWeight: 300, margin: "12px 0 0" }}>
            Ask the system.
          </h1>
        </div>

        <div className="bp-card" style={{ minHeight: 560, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 24, borderBottom: "1px solid var(--line)", display: "flex", gap: 12, alignItems: "center" }}>
            <MessageCircle size={18} style={{ color: "var(--blue-bright)" }} />
            <div>
              <div className="bp-serif" style={{ fontSize: 18 }}>Blueprint Coach</div>
              <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)" }}>
                MOCK MODE · AI INTEGRATION SOON
              </div>
            </div>
          </div>

          <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
            {chatMessages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "72%",
                    padding: "14px 16px",
                    border: "1px solid var(--line)",
                    background: message.role === "user" ? "rgba(59, 108, 255, 0.12)" : "var(--ink-2)",
                    color: "var(--white-dim)",
                    lineHeight: 1.6,
                    fontSize: 14,
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: 24, borderTop: "1px solid var(--line)", display: "flex", gap: 12 }}>
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Paste a message or ask for the next move..."
              style={{
                flex: 1,
                background: "var(--ink)",
                border: "1px solid var(--line)",
                color: "var(--white)",
                padding: "14px 16px",
                outline: "none",
              }}
            />

            <button onClick={sendMessage} className="bp-btn bp-btn-blue">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function ProgressTab() {
    return (
      <div className="bp-fade-up" style={{ padding: "48px 56px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div className="bp-label bp-label-blue">Progress</div>

        <h1 className="bp-serif" style={{ fontSize: 56, fontWeight: 300, margin: "12px 0 40px" }}>
          Your numbers are moving.
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            ["Overall", "71", "+8 this month"],
            ["Completed missions", "18", "+4 this week"],
            ["Photo score", "82", "+14 from first scan"],
          ].map(([title, value, detail]) => (
            <div key={title} className="bp-card" style={{ padding: 28 }}>
              <div className="bp-label">{title}</div>
              <div className="bp-serif" style={{ fontSize: 58, color: "var(--blue-bright)", marginTop: 18 }}>
                {value}
              </div>
              <div style={{ color: "var(--white-dim)", fontSize: 14 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div className="bp-card" style={{ padding: 32, marginTop: 24 }}>
          <div className="bp-label" style={{ marginBottom: 20 }}>
            Trajectory
          </div>

          <div style={{ height: 220, display: "flex", alignItems: "end", gap: 16 }}>
            {[42, 48, 51, 56, 61, 66, 71].map((height, index) => (
              <div key={index} style={{ flex: 1 }}>
                <div
                  style={{
                    height: `${height * 2}px`,
                    background: "linear-gradient(180deg, var(--blue-bright), rgba(59, 108, 255, 0.12))",
                    border: "1px solid var(--blue-deep)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function CommunityTab() {
    return (
      <div className="bp-fade-up" style={{ padding: "48px 56px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div className="bp-label bp-label-blue">Cohort</div>

        <h1 className="bp-serif" style={{ fontSize: 56, fontWeight: 300, margin: "12px 0 40px" }}>
          Quiet wins.
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            ["Marcus L.", "Sent the direct invite. She said yes. I was making it harder than it was."],
            ["Ivan T.", "Changed the first photo and the profile finally started converting."],
            ["Tom V.", "Stopped asking for approval. The conversations feel different now."],
          ].map(([name, text]) => (
            <div key={name} className="bp-card" style={{ padding: 28, display: "flex", gap: 20 }}>
              <div style={{ width: 48, height: 48, border: "1px solid var(--line-bright)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-bright)" }}>
                {name[0]}
              </div>

              <div>
                <div className="bp-serif" style={{ fontSize: 19 }}>{name}</div>
                <p style={{ color: "var(--white-dim)", lineHeight: 1.7, margin: "8px 0 0" }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bp-root" style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 260,
          background: "var(--ink-2)",
          borderRight: "1px solid var(--line)",
          padding: "28px 0",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div style={{ padding: "0 28px 28px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 14 }}>
          <div className="bp-mark" style={{ width: 26, height: 26 }} />

          <div>
            <div className="bp-serif" style={{ fontSize: 17 }}>Blueprint</div>
            <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)", letterSpacing: "0.1em" }}>
              CORE · DAY 12
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, border: "1px solid var(--line-bright)", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)" }}>
              <span className="bp-serif" style={{ fontSize: 18, color: "var(--blue-bright)" }}>D</span>
            </div>

            <div>
              <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)", letterSpacing: "0.12em" }}>
                MEMBER 0047
              </div>
              <div className="bp-serif" style={{ fontSize: 15, marginTop: 1 }}>
                Daniel R.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="bp-mono" style={{ fontSize: 10, color: "var(--gray)" }}>
                TIER IV
              </span>
              <span className="bp-mono" style={{ fontSize: 10, color: "var(--blue-bright)" }}>
                71
              </span>
            </div>

            <div className="bp-bar">
              <div className="bp-bar-fill" style={{ width: "71%" }} />
            </div>
          </div>
        </div>

        <nav style={{ padding: "20px 0", flex: 1 }}>
          {[
            { id: "home", icon: Home, label: "Dashboard" },
            { id: "coach", icon: Radio, label: "Coach" },
            { id: "progress", icon: BarChart3, label: "Progress" },
            { id: "community", icon: Users, label: "Cohort" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: "100%",
                padding: "14px 28px",
                background: activeTab === tab.id ? "var(--ink-3)" : "transparent",
                border: "none",
                borderLeft: activeTab === tab.id ? "1px solid var(--blue)" : "1px solid transparent",
                color: activeTab === tab.id ? "var(--white)" : "var(--gray)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              <tab.icon size={14} strokeWidth={1.5} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "24px 28px 0", borderTop: "1px solid var(--line)" }}>
          <div className="bp-label" style={{ marginBottom: 14 }}>
            Upgrade
          </div>

          <div style={{ padding: 18, background: "var(--ink-3)", border: "1px solid var(--blue-deep)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Crown size={13} style={{ color: "var(--blue-bright)" }} />
              <span className="bp-serif" style={{ fontSize: 16 }}>Pro tier</span>
            </div>

            <p style={{ margin: "0 0 14px", fontSize: 11, color: "var(--white-dim)", lineHeight: 1.6 }}>
              Real-time date mode. Monthly coach review.
            </p>

            <button className="bp-btn bp-btn-blue" style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: 11 }}>
              Subscribe
            </button>
          </div>

          <button
            onClick={onLogout}
            style={{
              marginTop: 20,
              background: "none",
              border: "none",
              color: "var(--gray-low)",
              fontSize: 10,
              cursor: "pointer",
              fontFamily: "JetBrains Mono",
              padding: 0,
              letterSpacing: "0.15em",
            }}
          >
            ← LOG OUT
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, background: "var(--ink)", display: "flex", flexDirection: "column" }}>
        {activeTab === "home" && <HomeTab />}
        {activeTab === "coach" && <CoachTab />}
        {activeTab === "progress" && <ProgressTab />}
        {activeTab === "community" && <CommunityTab />}
      </main>

      {showRatingModal && (
        <div
          onClick={() => {
            setShowRatingModal(false);
            setRatedPhoto(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 5, 7, 0.85)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 24,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bp-card bp-fade-up"
            style={{
              maxWidth: 600,
              width: "100%",
              padding: 48,
              background: "var(--ink-2)",
              position: "relative",
            }}
          >
            <button
              onClick={() => {
                setShowRatingModal(false);
                setRatedPhoto(null);
              }}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "1px solid var(--line)",
                padding: 8,
                color: "var(--gray)",
                cursor: "pointer",
              }}
            >
              <X size={13} />
            </button>

            {!ratedPhoto ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Upload size={38} style={{ color: "var(--blue-bright)", marginBottom: 24 }} />

                <div className="bp-serif" style={{ fontSize: 34, marginBottom: 12 }}>
                  Analyzing photo
                </div>

                <p style={{ color: "var(--white-dim)", lineHeight: 1.7 }}>
                  Blueprint is reading frame, lighting, contrast, posture and facial signal.
                </p>
              </div>
            ) : (
              <>
                <div className="bp-label bp-label-blue" style={{ marginBottom: 16 }}>
                  Photo assessment
                </div>

                <h2 className="bp-serif" style={{ fontSize: 42, margin: "0 0 20px" }}>
                  {ratedPhoto.verdict}
                </h2>

                <div className="bp-serif" style={{ fontSize: 64, color: "var(--blue-bright)", marginBottom: 20 }}>
                  {ratedPhoto.score}
                </div>

                <div style={{ marginBottom: 24 }}>
                  {ratedPhoto.positives.map((item, index) => (
                    <div key={index} style={{ display: "flex", gap: 12, padding: "8px 0", color: "var(--white-dim)" }}>
                      <Check size={13} style={{ color: "var(--blue-bright)", marginTop: 4 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 28 }}>
                  {ratedPhoto.negatives.map((item, index) => (
                    <div key={index} style={{ display: "flex", gap: 12, padding: "8px 0", color: "var(--white-dim)" }}>
                      <X size={13} style={{ color: "var(--gray)", marginTop: 4 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: 22, background: "var(--ink)", border: "1px solid var(--blue)", marginBottom: 28 }}>
                  <div className="bp-label bp-label-blue" style={{ marginBottom: 12 }}>
                    The move
                  </div>
                  <div style={{ color: "var(--white-dim)", lineHeight: 1.7 }}>
                    {ratedPhoto.action}
                  </div>
                </div>

                <button
                  className="bp-btn bp-btn-blue"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => {
                    setShowRatingModal(false);
                    setRatedPhoto(null);
                  }}
                >
                  Understood
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
