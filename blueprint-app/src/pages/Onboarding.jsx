import { ArrowLeft, ArrowRight, ChevronRight, LogOut } from "lucide-react";

export default function Onboarding({
  onboardStep,
  setOnboardStep,
  setView,
  onExit,
  onboardingAnswers,
  setOnboardingAnswers,
}) {
  const steps = [
    {
      key: "reason",
      question: "What brings you to Blueprint?",
      options: [
        "I'm matching with no one",
        "I match but don't convert",
        "Recently rejected. Still stings.",
        "Rebuilding after a breakup",
        "I'm already good — I want better",
      ],
    },
    {
      key: "age_bracket",
      question: "Your age bracket.",
      options: ["18–22", "23–27", "28–32", "33–37", "38 and above"],
    },
    {
      key: "platforms",
      question: "Which platforms are you on?",
      options: [
        "Hinge",
        "Tinder",
        "Bumble",
        "Feeld / niche",
        "Between apps right now",
      ],
    },
    {
      key: "feedback_style",
      question: "How direct should the feedback be?",
      options: [
        "Gentle — I'm fragile right now",
        "Direct — no softening",
        "Unvarnished — break me and rebuild",
      ],
    },
  ];

  const currentStep = steps[onboardStep];
  const isComplete = onboardStep >= steps.length;

  function handleSelectOption(stepKey, option) {
    setOnboardingAnswers((currentAnswers) => ({
      ...currentAnswers,
      [stepKey]: option,
    }));

    setOnboardStep(onboardStep + 1);
  }

  function handlePreviousStep() {
    setOnboardStep(onboardStep - 1);
  }

  function handleEnterBlueprint() {
    setView("app");
  }

  function handleExit() {
    if (onExit) {
      onExit();
    }
  }

  if (isComplete) {
    return (
      <main className="onboarding-shell onboarding-complete-shell">
        <div className="onboarding-grid" aria-hidden="true" />
        <div className="onboarding-glow onboarding-glow-blue" aria-hidden="true" />
        <div className="onboarding-glow onboarding-glow-red" aria-hidden="true" />

        <section className="onboarding-complete-card">
          <div className="onboarding-kicker">◆ Assessment complete</div>

          <h1 className="onboarding-complete-title">
            Welcome <em>in</em>.
          </h1>

          <p className="onboarding-complete-text">
            Provisional score: <strong>71</strong>. Tier IV.
            <br />
            It will sharpen as you feed the system. Let us begin.
          </p>

          <button
            className="onboarding-primary-button"
            type="button"
            onClick={handleEnterBlueprint}
          >
            Enter Blueprint
            <ArrowRight size={15} strokeWidth={1.8} />
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="onboarding-shell">
      <div className="onboarding-grid" aria-hidden="true" />
      <div className="onboarding-glow onboarding-glow-blue" aria-hidden="true" />
      <div className="onboarding-glow onboarding-glow-red" aria-hidden="true" />

      <header className="onboarding-header">
        <div className="onboarding-brand">
          <div className="onboarding-brand-mark" />

          <div>
            <div className="onboarding-brand-name">Blueprint</div>
            <div className="onboarding-brand-subtitle">Private assessment</div>
          </div>
        </div>

        <div className="onboarding-step-indicator">
          Assessment · {String(onboardStep + 1).padStart(2, "0")} /{" "}
          {String(steps.length).padStart(2, "0")}
        </div>

        <button
          className="onboarding-exit-button"
          type="button"
          onClick={handleExit}
        >
          <LogOut size={14} strokeWidth={1.8} />
          Exit
        </button>
      </header>

      <section className="onboarding-content">
        <div className="onboarding-progress">
          {steps.map((_, index) => (
            <div
              key={index}
              className={
                index <= onboardStep
                  ? "onboarding-progress-bar onboarding-progress-bar-active"
                  : "onboarding-progress-bar"
              }
            />
          ))}
        </div>

        <div key={onboardStep} className="onboarding-question-panel">
          <p className="onboarding-kicker">
            Question · {String(onboardStep + 1).padStart(2, "0")}
          </p>

          <h1 className="onboarding-question-title">
            {currentStep.question}
          </h1>

          <div className="onboarding-options">
            {currentStep.options.map((option, index) => {
              const isSelected = onboardingAnswers?.[currentStep.key] === option;

              return (
                <button
                  key={option}
                  className={
                    isSelected
                      ? "onboarding-option-button onboarding-option-button-selected"
                      : "onboarding-option-button"
                  }
                  type="button"
                  onClick={() => handleSelectOption(currentStep.key, option)}
                >
                  <span className="onboarding-option-left">
                    <span className="onboarding-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="onboarding-option-text">{option}</span>
                  </span>

                  <ChevronRight size={16} strokeWidth={1.6} />
                </button>
              );
            })}
          </div>

          {onboardStep > 0 && (
            <button
              className="onboarding-back-button"
              type="button"
              onClick={handlePreviousStep}
            >
              <ArrowLeft size={14} strokeWidth={1.8} />
              Previous
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
