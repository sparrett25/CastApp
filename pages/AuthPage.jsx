import { useState } from "react";
import { supabase } from "../lib/supabase";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";

import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";

import "../styles/pages/auth.css";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const DEBUG_SCENE = null;

  const atmosphere = useAtmosphere("authPage");

  const scene = DEBUG_SCENE ? getScene(DEBUG_SCENE) : atmosphere.scene;

  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

  const cardStyle = styles.cardStyle ?? {};
  const inputStyle = styles.inputStyle ?? {};
  const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};
  const buttonSecondaryStyle = styles.buttonSecondaryStyle ?? {};
  const textTheme = ui.text ?? {};

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        if (!displayName.trim()) {
          setMessage("Please choose a display name.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName.trim(),
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          setMessage("Account created. Entering Cast...");
        } else {
          setMessage("Account created. Please log in.");
          setMode("login");
        }

        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CastBackground
      chamberKey="authpage"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
    >
      <ChamberLayout>
        <div className="auth-page">
          <div className="auth-card" style={cardStyle}>
            <p className="auth-eyebrow" style={{ color: textTheme?.secondary }}>
              Cast
            </p>

            <h1 className="auth-title" style={{ color: textTheme?.primary }}>
              {mode === "login" ? "Welcome back" : "Enter Cast"}
            </h1>

            <p className="auth-subtitle" style={{ color: textTheme?.secondary }}>
              A private fishing world for memory, learning, and presence.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === "signup" && (
                <input
                  type="text"
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="auth-input"
                  style={inputStyle}
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                style={inputStyle}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                style={inputStyle}
                required
              />

              <button
                type="submit"
                className="auth-button"
                style={buttonPrimaryStyle}
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Log In"
                  : "Sign Up"}
              </button>
            </form>

            {message && (
              <p className="auth-message" style={{ color: textTheme?.secondary }}>
                {message}
              </p>
            )}

            <button
              type="button"
              className="auth-switch"
              style={buttonSecondaryStyle}
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setMessage("");
              }}
            >
              {mode === "login"
                ? "Need an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}