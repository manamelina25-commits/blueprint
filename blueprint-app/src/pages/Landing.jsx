import {
  ArrowRight,
  Check,
  Crown,
  Eye,
  MessageCircle,
  Sparkles,
  Target,
  User,
  Zap,
} from "lucide-react";

export default function Landing({ setView }) {
  return (
    <div className="bp-root" style={{ position: "relative", overflow: "hidden" }}>
      {/* subtle grid wash */}
      <div className="bp-grid" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 600,
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(59, 108, 255, 0.12), transparent 60%)",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          padding: "28px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="bp-mark" />
          <div>
            <div
              className="bp-serif"
              style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.03em" }}
            >
              Blueprint
            </div>
            <div
              className="bp-mono"
              style={{ fontSize: 9, color: "var(--gray-low)", marginTop: -2 }}
            >
              EST. 2026
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["The System", "Membership", "Journal"].map((l) => (
            <a key={l} className="bp-label" style={{ cursor: "pointer" }}>
              {l}
            </a>
          ))}

          <button
            className="bp-btn bp-btn-ghost"
            style={{ padding: "11px 20px" }}
            onClick={() => setView("onboarding")}
          >
            Enter
          </button>
        </div>
      </nav>

      <div className="bp-hairline" />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "140px 56px 160px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 100,
            alignItems: "center",
          }}
        >
          <div className="bp-fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--blue)",
                  borderRadius: "50%",
                  animation: "bp-pulse 2.4s infinite",
                }}
              />
              <span className="bp-label bp-label-blue">A private practice for modern men</span>
            </div>

            <h1
              className="bp-serif"
              style={{
                fontSize: 116,
                lineHeight: 0.96,
                fontWeight: 300,
                margin: 0,
                letterSpacing: "-0.04em",
              }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue-bright)" }}>
                discreet
              </em>
              <br />
              study of
              <br />
              becoming.
            </h1>

            <p
              style={{
                fontSize: 19,
                color: "var(--white-dim)",
                marginTop: 40,
                maxWidth: 520,
                lineHeight: 1.65,
                fontWeight: 300,
              }}
            >
              Blueprint is a coaching system for men who refuse to leave who they become to
              chance. We measure the six things that actually matter, tell you the truth, and hand
              you the next move — every day, until the numbers move.
            </p>

            <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
              <button className="bp-btn bp-btn-blue" onClick={() => setView("onboarding")}>
                Begin the assessment <ArrowRight size={14} strokeWidth={1.8} />
              </button>
              <button className="bp-btn bp-btn-ghost">Read the manifesto</button>
            </div>

            <div style={{ marginTop: 72, display: "flex", gap: 48 }}>
              {[
                ["12,847", "men enrolled"],
                ["+14 pts", "avg. 60-day gain"],
                ["87%", "complete the protocol"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    className="bp-serif"
                    style={{ fontSize: 32, fontWeight: 400, letterSpacing: "-0.03em" }}
                  >
                    {n}
                  </div>
                  <div className="bp-label" style={{ marginTop: 4 }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spec card */}
          <div style={{ position: "relative", aspectRatio: "4/5.2" }}>
            <div
              className="bp-card bp-fade-up"
              style={{
                height: "100%",
                padding: 36,
                animationDelay: "0.3s",
                background: "var(--ink-2)",
              }}
            >
              <div className="bp-corner bp-corner-tl" />
              <div className="bp-corner bp-corner-tr" />
              <div className="bp-corner bp-corner-bl" />
              <div className="bp-corner bp-corner-br" />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  paddingBottom: 20,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div>
                  <div className="bp-mono" style={{ fontSize: 9, color: "var(--blue-bright)" }}>
                    MEMBER · 0047
                  </div>
                  <div
                    className="bp-serif"
                    style={{ fontSize: 24, fontWeight: 400, marginTop: 4, letterSpacing: "-0.02em" }}
                  >
                    Daniel R.
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)" }}>
                    ASSESSMENT
                  </div>
                  <div
                    className="bp-serif"
                    style={{
                      fontSize: 44,
                      lineHeight: 1,
                      fontWeight: 300,
                      color: "var(--blue-bright)",
                    }}
                  >
                    71
                  </div>
                </div>
              </div>

              {/* Portrait */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1.15/1",
                  marginTop: 24,
                  background: "var(--ink)",
                  border: "1px solid var(--line)",
                  overflow: "hidden",
                }}
              >
                <svg viewBox="0 0 240 200" style={{ width: "100%", height: "100%" }}>
                  <defs>
                    <pattern id="pg" width="12" height="12" patternUnits="userSpaceOnUse">
                      <path
                        d="M 12 0 L 0 0 0 12"
                        fill="none"
                        stroke="#16161e"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>

                  <rect width="240" height="200" fill="url(#pg)" />

                  <g stroke="#5f8aff" strokeWidth="0.6" fill="none">
                    <ellipse cx="120" cy="80" rx="32" ry="40" />
                    <path d="M 88 118 Q 120 100 152 118 L 162 200 L 78 200 Z" />
                    <line
                      x1="120"
                      y1="40"
                      x2="120"
                      y2="120"
                      strokeDasharray="1 3"
                      opacity="0.5"
                    />
                  </g>

                  {/* Annotations */}
                  <g stroke="#9ab4ff" strokeWidth="0.5" fill="none" opacity="0.9">
                    <line x1="152" y1="62" x2="205" y2="48" />
                    <circle cx="152" cy="62" r="1.5" fill="#9ab4ff" />
                    <line x1="88" y1="102" x2="35" y2="118" />
                    <circle cx="88" cy="102" r="1.5" fill="#9ab4ff" />
                  </g>

                  <text
                    x="208"
                    y="46"
                    fill="#9ab4ff"
                    fontSize="6"
                    fontFamily="JetBrains Mono"
                    letterSpacing="0.5"
                  >
                    JAW
                  </text>
                  <text
                    x="10"
                    y="122"
                    fill="#9ab4ff"
                    fontSize="6"
                    fontFamily="JetBrains Mono"
                    letterSpacing="0.5"
                  >
                    FRAME
                  </text>

                  <rect
                    x="0"
                    y="0"
                    width="240"
                    height="0.8"
                    fill="#3b6cff"
                    opacity="0.6"
                    style={{ animation: "bp-scan 4s infinite" }}
                  />
                </svg>
              </div>

              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["Face", 68],
                  ["Style", 74],
                  ["Profile", 62],
                  ["Dialogue", 77],
                  ["Presence", 70],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                        fontSize: 12,
                      }}
                    >
                      <span style={{ color: "var(--white-dim)" }}>{k}</span>
                      <span className="bp-mono" style={{ color: "var(--blue-bright)" }}>
                        {String(v).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="bp-bar">
                      <div className="bp-bar-fill" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bp-hairline" />

      {/* System */}
      <section style={{ position: "relative", padding: "120px 56px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, marginBottom: 80 }}>
          <div>
            <div className="bp-label">§ 01 · The system</div>
            <h2
              className="bp-serif"
              style={{
                fontSize: 68,
                margin: "24px 0 0",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.035em",
              }}
            >
              Six{" "}
              <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>honest</em>
              <br />
              measurements.
            </h2>
          </div>

          <p
            style={{
              fontSize: 18,
              color: "var(--white-dim)",
              alignSelf: "end",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Most advice is flattering or cruel; rarely useful. Blueprint scores what actually moves
            outcomes — without pretending one number explains a man. Each measurement is paired
            with the next concrete action.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
        >
          {[
            {
              icon: Eye,
              label: "Face & Frame",
              desc: "Structure, grooming, expression, composition. Scored per photograph, ranked against the cohort.",
            },
            {
              icon: Sparkles,
              label: "Style",
              desc: "Fit, colour, silhouette. Measured against skin tone and context — not against trends.",
            },
            {
              icon: User,
              label: "Profile",
              desc: "Bio, prompts, the order of photographs. Every element rewritten until it converts.",
            },
            {
              icon: MessageCircle,
              label: "Dialogue",
              desc: "Paste the thread. We show the exact line where it stalled — and the rewrite that closes it.",
            },
            {
              icon: Zap,
              label: "Presence",
              desc: "Hedge words. Over-explaining. The tells she reads before you finish the sentence.",
            },
            {
              icon: Target,
              label: "Daily Practice",
              desc: "One concrete action, before sunset. The streak breaks and the score bleeds. No exceptions.",
            },
          ].map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                style={{
                  background: "var(--ink)",
                  padding: 48,
                  minHeight: 280,
                  position: "relative",
                  transition: "background 0.4s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--ink-2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--ink)";
                }}
              >
                <div
                  className="bp-mono"
                  style={{
                    fontSize: 10,
                    color: "var(--gray-low)",
                    position: "absolute",
                    top: 24,
                    right: 28,
                  }}
                >
                  0{i + 1} / 06
                </div>

                <Icon
                  size={22}
                  style={{ color: "var(--blue-bright)", marginBottom: 32 }}
                  strokeWidth={1.2}
                />

                <h3
                  className="bp-serif"
                  style={{
                    fontSize: 28,
                    margin: "0 0 14px",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.label}
                </h3>

                <p
                  style={{
                    color: "var(--white-dim)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="bp-hairline" />

      {/* Pull quote */}
      <section
        style={{
          position: "relative",
          padding: "140px 56px",
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div className="bp-label bp-label-blue" style={{ marginBottom: 40 }}>
          ◆ FROM THE MANIFESTO
        </div>

        <blockquote
          className="bp-serif"
          style={{
            fontSize: 52,
            lineHeight: 1.15,
            fontWeight: 300,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          "The work of becoming is not loud. It is not performed. It is the{" "}
          <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>quiet, daily</em>{" "}
          accumulation of honest feedback and small, deliberate acts."
        </blockquote>
      </section>

      <div className="bp-hairline" />

      {/* Membership / Pricing */}
      <section style={{ position: "relative", padding: "120px 56px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 72 }}>
          <div>
            <div className="bp-label">§ 02 · Membership</div>
            <h2
              className="bp-serif"
              style={{
                fontSize: 68,
                margin: "24px 0 0",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.035em",
              }}
            >
              Three{" "}
              <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>tiers</em>.
              <br />
              Three commitments.
            </h2>
          </div>

          <div
            className="bp-mono"
            style={{ fontSize: 11, color: "var(--gray)", textAlign: "right" }}
          >
            SEVEN-DAY REFUND
            <br />
            CANCEL ANYTIME
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            {
              tier: "Core",
              price: "14.99",
              annual: "99",
              tag: "The foundation",
              feats: [
                "Unlimited coaching dialogue",
                "Weekly re-assessment",
                "Unlimited photograph scoring",
                "Daily practice & streak",
                "Progression tracking",
              ],
              cta: "Begin",
            },
            {
              tier: "Pro",
              price: "39.99",
              annual: "349",
              tag: "Most subscribed",
              feats: [
                "Everything in Core",
                "Real-time date mode",
                "Match & reply analytics",
                "Priority model (Opus)",
                "Monthly coach review film",
              ],
              cta: "Subscribe",
              featured: true,
            },
            {
              tier: "Private",
              price: "149",
              annual: "1,490",
              tag: "By application",
              feats: [
                "Everything in Pro",
                "Weekly one-to-one coach call",
                "Bespoke photography plan",
                "Live workshops access",
                "Private member cohort",
              ],
              cta: "Apply",
            },
          ].map((plan, i) => (
            <div
              key={i}
              className="bp-card"
              style={{
                padding: 40,
                background: plan.featured ? "var(--ink-2)" : "var(--ink)",
                border: plan.featured ? "1px solid var(--blue)" : "1px solid var(--line)",
                position: "relative",
              }}
            >
              {plan.featured && (
                <>
                  <div className="bp-corner bp-corner-tl" />
                  <div className="bp-corner bp-corner-tr" />
                  <div className="bp-corner bp-corner-bl" />
                  <div className="bp-corner bp-corner-br" />
                  <div
                    style={{
                      position: "absolute",
                      top: -11,
                      left: 32,
                      padding: "4px 12px",
                      background: "var(--blue)",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "JetBrains Mono",
                    }}
                  >
                    Most subscribed
                  </div>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: 32,
                }}
              >
                <div>
                  <div
                    className="bp-serif"
                    style={{ fontSize: 36, fontWeight: 400, letterSpacing: "-0.025em" }}
                  >
                    {plan.tier}
                  </div>
                  <div
                    className="bp-mono"
                    style={{
                      fontSize: 10,
                      color: plan.featured ? "var(--blue-bright)" : "var(--gray-low)",
                      marginTop: 6,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {plan.tag}
                  </div>
                </div>

                {plan.featured && (
                  <Crown size={16} style={{ color: "var(--blue-bright)" }} strokeWidth={1.5} />
                )}
              </div>

              <div style={{ paddingBottom: 28, marginBottom: 28, borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span className="bp-mono" style={{ fontSize: 14, color: "var(--gray)" }}>
                    $
                  </span>
                  <span
                    className="bp-serif"
                    style={{
                      fontSize: 64,
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--gray)", marginLeft: 4 }}>
                    /month
                  </span>
                </div>

                <div
                  className="bp-mono"
                  style={{
                    fontSize: 10,
                    color: "var(--gray-low)",
                    marginTop: 10,
                    letterSpacing: "0.15em",
                  }}
                >
                  OR ${plan.annual} / YEAR · SAVE 30%
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", minHeight: 200 }}>
                {plan.feats.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      gap: 14,
                      padding: "11px 0",
                      fontSize: 14,
                      borderBottom: j < plan.feats.length - 1 ? "1px solid var(--line)" : "none",
                      color: "var(--white-dim)",
                    }}
                  >
                    <Check
                      size={12}
                      style={{ color: "var(--blue-bright)", marginTop: 5, flexShrink: 0 }}
                      strokeWidth={2}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`bp-btn ${plan.featured ? "bp-btn-blue" : "bp-btn-ghost"}`}
                style={{ width: "100%", justifyContent: "space-between" }}
                onClick={() => setView("onboarding")}
              >
                {plan.cta}
                <ArrowRight size={14} strokeWidth={1.8} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="bp-hairline" />

      {/* Closing */}
      <section style={{ position: "relative", padding: "140px 56px", textAlign: "center" }}>
        <div className="bp-label bp-label-blue" style={{ marginBottom: 32 }}>
          ◆ THE WORK WILL NOT WAIT
        </div>

        <h2
          className="bp-serif"
          style={{
            fontSize: 96,
            fontWeight: 300,
            lineHeight: 0.95,
            margin: 0,
            letterSpacing: "-0.04em",
          }}
        >
          Stop guessing.
          <br />
          Start{" "}
          <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>becoming</em>.
        </h2>

        <button
          className="bp-btn bp-btn-blue"
          style={{ padding: "20px 40px", fontSize: 14, marginTop: 56 }}
          onClick={() => setView("onboarding")}
        >
          Begin the assessment <ArrowRight size={14} strokeWidth={1.8} />
        </button>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "48px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="bp-mark" style={{ width: 22, height: 22 }} />
          <div>
            <div className="bp-serif" style={{ fontSize: 16 }}>
              Blueprint
            </div>
            <div className="bp-mono" style={{ fontSize: 9, color: "var(--gray-low)" }}>
              © MMXXVI · ALL RIGHTS RESERVED
            </div>
          </div>
        </div>

        <div
          className="bp-mono"
          style={{
            fontSize: 10,
            color: "var(--gray-low)",
            display: "flex",
            gap: 28,
            letterSpacing: "0.15em",
          }}
        >
          <a>TERMS</a>
          <a>PRIVACY</a>
          <a>REFUNDS</a>
          <a>CONTACT</a>
        </div>
      </footer>
    </div>
  );
}
