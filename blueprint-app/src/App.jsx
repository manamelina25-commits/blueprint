import { useEffect, useState } from "react";
import "./App.css";

import { supabase } from "./lib/supabaseClient";
import {
  completeUserOnboarding,
  getOrCreateProfile,
} from "./lib/profileService";

import AuthPage from "./pages/AuthPage";
import Onboarding from "./pages/Onboarding";
import AppInterior from "./pages/AppInterior";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState("onboarding");
  const [onboardStep, setOnboardStep] = useState(0);

  async function loadUserProfile(user) {
    const userProfile = await getOrCreateProfile(user);

    setProfile(userProfile);
    setView(userProfile.onboarding_completed ? "app" : "onboarding");

    return userProfile;
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
      }

      if (!isMounted) {
        return;
      }

      const currentSession = data.session;
      setSession(currentSession);

      if (currentSession?.user) {
        try {
          await loadUserProfile(currentSession.user);
        } catch (profileError) {
          console.error(profileError);
        }
      }

      setIsLoading(false);
    }

    loadInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);

      if (currentSession?.user) {
        loadUserProfile(currentSession.user).catch((profileError) => {
          console.error(profileError);
        });
      } else {
        setProfile(null);
        setView("onboarding");
        setOnboardStep(0);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSetView(nextView) {
    if (nextView === "app" && session?.user) {
      try {
        setIsLoading(true);

        const updatedProfile = await completeUserOnboarding(session.user.id, {
          completed_at: new Date().toISOString(),
          source: "onboarding_v1",
        });

        setProfile(updatedProfile);
        setView("app");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }

      return;
    }

    setView(nextView);
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    setSession(null);
    setProfile(null);
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

      {view === "app" && (
        <AppInterior
          profile={profile}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;
