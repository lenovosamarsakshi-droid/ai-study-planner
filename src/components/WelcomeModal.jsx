import { useState } from "react";
import {
  loadStudentProfile,
  saveStudentProfile,
} from "../agent/memory/profile";

function WelcomeModal({ onComplete }) {
  const [name, setName] = useState("");

  function handleContinue() {
    if (!name.trim()) return;

    const profile = loadStudentProfile();

    profile.name = name.trim();

    saveStudentProfile(profile);

    onComplete(name.trim());
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <h2>👋 Welcome to Study Planner AI</h2>

        <p>Let's personalize your experience.</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;