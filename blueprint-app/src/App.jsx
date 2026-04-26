import "./styles/blueprint.css";
import Onboarding from "./pages/Onboarding";
import React, { useState, useEffect, useRef } from "react";
import Landing from "./pages/Landing";
import ScoreRing from "./components/ScoreRing";
import AppInterior from "./pages/AppInterior";
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

    {view === "app" && <AppInterior setView={setView} />}
  </>
);
};

export default BlueprintApp;
