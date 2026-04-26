import { ArrowRight, ChevronRight } from "lucide-react";

export default function Onboarding({ onboardStep, setOnboardStep, setView }) {
  const steps = [
    {
      q: "What brings you to Blueprint?",
      opts: [
        "I'm matching with no one",
        "I match but don't convert",
        "Recently rejected. Still stings.",
        "Rebuilding after a breakup",
        "I'm already good — I want better",
      ],
    },
    {
      q: "Your age bracket.",
      opts: ["18–22", "23–27", "28–32", "33–37", "38 and above"],
    },
    {
      q: "Which platforms are you on?",
      opts: ["Hinge", "Tinder", "Bumble", "Feeld / niche", "Between apps right now"],
    },
    {
      q: "How direct should the feedback be?",
      opts: [
        "Gentle — I'm fragile right now",
        "Direct — no softening",
        "Unvarnished — break me and rebuild",
      ],
    },
  ];

  const step = steps[onboardStep];

  if (onboardStep >= steps.length) {
    return (
      <div
        className="bp-root"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div className="bp-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(59, 108, 255, 0.1), transparent 60%)",
          }}
        />

        <div
          style={{ textAlign: "center", maxWidth: 640, padding: 48, position: "relative" }}
          className="bp-slow-fade"
        >
          <div className="bp-label bp-label-blue" style={{ marginBottom: 24 }}>
            ◆ ASSESSMENT COMPLETE
          </div>

          <h2
            className="bp-serif"
            style={{
              fontSize: 88,
              fontWeight: 300,
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: "-0.04em",
            }}
          >
            Welcome{" "}
            <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>in</em>.
          </h2>

          <p
            style={{
              color: "var(--white-dim)",
              fontSize: 17,
              margin: "32px 0 48px",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Provisional score:{" "}
            <span className="bp-mono" style={{ color: "var(--blue-bright)" }}>
              71
            </span>
            . Tier IV.
            <br />
            It will sharpen as you feed the system. Let us begin.
          </p>

          <button
            className="bp-btn bp-btn-blue"
            style={{ padding: "18px 36px" }}
            onClick={() => setView("app")}
          >
            Enter Blueprint <ArrowRight size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bp-root" style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bp-grid" style={{ position: "absolute", inset: 0, opacity: 0.25 }} />

      <div
        style={{
          position: "relative",
          padding: "28px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="bp-mark" style={{ width: 26, height: 26 }} />
          <span className="bp-serif" style={{ fontSize: 20, fontWeight: 400 }}>
            Blueprint
          </span>
        </div>

        <div
          className="bp-mono"
          style={{
            fontSize: 11,
            color: "var(--blue-bright)",
            letterSpacing: "0.18em",
          }}
        >
          ASSESSMENT · {String(onboardStep + 1).padStart(2, "0")} /{" "}
          {String(steps.length).padStart(2, "0")}
        </div>

        <button
          className="bp-btn bp-btn-ghost"
          style={{ padding: "8px 16px", fontSize: 11 }}
          onClick={() => setView("landing")}
        >
          Exit
        </button>
      </div>

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 80 }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 1,
                background: i <= onboardStep ? "var(--blue)" : "var(--line)",
                transition: "background 0.4s",
              }}
            />
          ))}
        </div>

        <div key={onboardStep} className="bp-fade-up">
          <div className="bp-label bp-label-blue" style={{ marginBottom: 28 }}>
            QUESTION · 0{onboardStep + 1}
          </div>

          <h2
            className="bp-serif"
            style={{
              fontSize: 64,
              fontWeight: 300,
              lineHeight: 1.05,
              margin: "0 0 64px",
              letterSpacing: "-0.035em",
            }}
          >
            {step.q}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {step.opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => setOnboardStep(onboardStep + 1)}
                style={{
                  background: "var(--ink-2)",
                  border: "1px solid var(--line)",
                  color: "var(--white)",
                  padding: "24px 28px",
                  textAlign: "left",
                  fontSize: 16,
                  fontFamily: "inherit",
                  fontWeight: 400,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.background = "var(--ink-3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "var(--ink-2)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <span
                    className="bp-mono"
                    style={{
                      fontSize: 11,
                      color: "var(--blue-bright)",
                      width: 16,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>

                  <span>{opt}</span>
                </div>

                <ChevronRight size={14} style={{ color: "var(--gray-low)" }} strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {onboardStep > 0 && (
            <button
              onClick={() => setOnboardStep(onboardStep - 1)}
              style={{
                marginTop: 40,
                background: "none",
                border: "none",
                color: "var(--gray)",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
                letterSpacing: "0.05em",
              }}
            >
              ← Previous
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
