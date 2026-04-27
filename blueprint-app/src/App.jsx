import { useEffect, useState } from "react";
import "./App.css";

import { supabase } from "./lib/supabaseClient";

import AuthPage from "./pages/AuthPage";
import Onboarding from "./pages/Onboarding";
import AppInterior from "./pages/AppInterior";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [view, setView] = useState("onboarding");
  const [onboardStep, setOnboardStep] = useState(0);

  useEffect(() => {
    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
      }

      const currentSession = data.session;
      setSession(currentSession);

      if (currentSession?.user) {
        const onboardingCompleted = localStorage.getItem(
          `blueprint:onboarding_completed:${currentSession.user.id}`
        );

        setView(onboardingCompleted === "true" ? "app" : "onboarding");
      }

      setIsLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);

      if (currentSession?.user) {
        const onboardingCompleted = localStorage.getItem(
          `blueprint:onboarding_completed:${currentSession.user.id}`
        );

        setView(onboardingCompleted === "true" ? "app" : "onboarding");
      } else {
        setView("onboarding");
        setOnboardStep(0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function handleSetView(nextView) {
    if (nextView === "app" && session?.user) {
      localStorage.setItem(
        `blueprint:onboarding_completed:${session.user.id}`,
        "true"
      );
    }

    setView(nextView);
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    setSession(null);
    setView("onboarding");
    setOnboardStep(0);
  }

  if (isLoading) {
    return (
      <div
        className="bp-root"
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "var(--ink)",
        }}
      >
        <div className="bp-label bp-label-blue">Loading Blueprint...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  return (
    <>
      {view === "onboarding" && (
        <Onboarding
  onboardStep={onboardStep}
  setOnboardStep={setOnboardStep}
  setView={handleSetView}
  onExit={handleLogout}
/>
      )}

      {view === "app" && <AppInterior onLogout={handleLogout} />}
    </>
  );
}

export default App;
