import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignIn(event) {
    event.preventDefault();

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  }

  async function handleSignUp(event) {
    event.preventDefault();

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    if (!data.session) {
      setSuccessMessage(
        "Account created. Check your email to confirm your registration before signing in."
      );
    } else {
      setSuccessMessage("Account created successfully.");
    }

    setIsLoading(false);
  }

  function switchAuthMode(nextMode) {
    setAuthMode(nextMode);
    setSuccessMessage("");
    setErrorMessage("");
  }

  return (
    <main className="auth-shell">
      <div className="auth-grid" aria-hidden="true" />
      <div className="auth-glow auth-glow-blue" aria-hidden="true" />
      <div className="auth-glow auth-glow-red" aria-hidden="true" />

      <section className="auth-card">
        <div className="auth-card-line" />

        <div className="auth-brand">
          <div className="auth-brand-mark" />

          <div>
            <div className="auth-brand-name">Blueprint</div>
            <div className="auth-brand-kicker">PRIVATE ACCESS</div>
          </div>
        </div>

        <div key={authMode} className="auth-mode-panel">
          <div className="auth-copy-block">
            <p className="auth-eyebrow">Authentication required</p>

            <h1 className="auth-title">
              {authMode === "sign-in"
                ? "Sign in to continue."
                : "Create your account."}
            </h1>

            <p className="auth-description">
              {authMode === "sign-in"
                ? "Access your private dashboard, progress system, coach and photo analysis."
                : "Create your account to save your progress and start your Blueprint journey."}
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={authMode === "sign-in" ? handleSignIn : handleSignUp}
          >
            <label className="auth-field">
              <span>Email</span>

              <input
                className="auth-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>

              <input
                className="auth-input"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            {errorMessage && (
              <div className="auth-alert auth-alert-error">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="auth-alert auth-alert-success">
                {successMessage}
              </div>
            )}

            <button className="auth-submit" type="submit" disabled={isLoading}>
              {isLoading
                ? "Please wait..."
                : authMode === "sign-in"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>
        </div>

        <div className="auth-switch">
          {authMode === "sign-in" ? (
            <button type="button" onClick={() => switchAuthMode("sign-up")}>
              Do not have an account? <strong>Create account</strong>
            </button>
          ) : (
            <button type="button" onClick={() => switchAuthMode("sign-in")}>
              Already have an account? <strong>Sign in</strong>
            </button>
          )}
        </div>

        <p className="auth-footer">
          Google sign-in will be added after the email/password flow is stable.
        </p>
      </section>
    </main>
  );
}
