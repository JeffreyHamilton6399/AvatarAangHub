"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PASSWORD = "AvatarAang";
const STORAGE_KEY = "avatarhub_auth";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  // Start authed=true on first render so SSR + first paint show the site,
  // then on mount check localStorage: if NOT authed, show the gate overlay.
  // This avoids a flash of the gate for already-authed returning visitors.
  const [authed, setAuthed] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const isAuthed = localStorage.getItem(STORAGE_KEY) === "1";
    setAuthed(isAuthed);
    setChecked(true);
  }, []);

  React.useEffect(() => {
    if (checked && !authed) {
      const t = setTimeout(() => inputRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
  }, [checked, authed]);

  const tryAuth = React.useCallback(() => {
    if (input.trim() === PASSWORD) {
      setError(false);
      localStorage.setItem(STORAGE_KEY, "1");
      setLeaving(true);
      setTimeout(() => {
        setAuthed(true);
        setLeaving(false);
      }, 480);
    } else {
      setError(true);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input]);

  // Authed: render children (gate may animate out over them)
  if (authed && !leaving) return <>{children}</>;

  const elements = [
    { src: "/images/air.png", alt: "Air", color: "var(--air)", delay: "0s" },
    { src: "/images/water.png", alt: "Water", color: "var(--water)", delay: "0.5s" },
    { src: "/images/earth.png", alt: "Earth", color: "var(--earth)", delay: "1s" },
    { src: "/images/fire.png", alt: "Fire", color: "var(--fire)", delay: "1.5s" },
  ];

  return (
    <>
      {/* Render children underneath so they're ready when gate lifts */}
      <div aria-hidden={true} style={{ visibility: leaving ? "visible" : "hidden" }}>
        {children}
      </div>

      {/* Gate overlay */}
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 px-4"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, #071220 0%, #04070d 65%)",
          fontFamily: "var(--font-cinzel), Georgia, serif",
          ...(leaving
            ? { animation: "aa-gate-out 0.5s cubic-bezier(.4,0,1,1) both", pointerEvents: "none" }
            : {}),
        }}
      >
        <style>{`
          @keyframes aa-gate-shake {
            0%,100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
          }
          @keyframes aa-gate-out {
            to { opacity: 0; transform: scale(1.04); }
          }
        `}</style>

        {/* Four element symbols */}
        <div className="aa-fade-in flex items-center gap-[clamp(1.2rem,4vw,3rem)]" style={{ animationDelay: "0.05s" }}>
          {elements.map((el) => (
            <img
              key={el.alt}
              src={el.src}
              alt={el.alt}
              className="h-[clamp(36px,5vw,56px)] w-[clamp(36px,5vw,56px)] object-contain opacity-80"
              style={{ animation: `aa-pulse-glow 2.8s ease-in-out infinite ${el.delay}`, color: el.color }}
            />
          ))}
        </div>

        {/* Title */}
        <h1
          className="aa-slide-up font-display text-center text-[clamp(1.4rem,4vw,2.4rem)] tracking-[0.12em]"
          style={{
            background: "linear-gradient(135deg, #fff 0%, #d4e8ff 40%, #4db8ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animationDelay: "0.05s",
          }}
        >
          AvatarArchive
        </h1>

        {/* Subtitle */}
        <p
          className="aa-slide-up font-body-aa italic text-[clamp(.75rem,1.8vw,1rem)] uppercase tracking-[0.3em] text-[#6b8aab]"
          style={{ animationDelay: "0.12s" }}
        >
          Members Only
        </p>

        {/* Divider */}
        <div className="aa-fade-in h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)", animationDelay: "0.16s" }} />

        {/* Input group — NO form element to prevent mobile navigation/404 */}
        <div
          className="aa-slide-up flex w-[min(340px,88vw)] flex-col items-center gap-4"
          style={{
            animationDelay: "0.2s",
            ...(error ? { animation: "aa-gate-shake 0.4s cubic-bezier(.36,.07,.19,.97) both" } : {}),
          }}
        >
          <label
            htmlFor="gate-input"
            className="text-[0.44rem] uppercase tracking-[0.35em] text-[#6b8aab]"
          >
            Enter Password
          </label>

          <div className="relative w-full">
            <input
              ref={inputRef}
              id="gate-input"
              type={show ? "text" : "password"}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  tryAuth();
                }
              }}
              placeholder="••••••••••"
              autoComplete="current-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="go"
              inputMode="text"
              className="w-full rounded-full border bg-[rgba(10,17,28,0.85)] px-5 py-3 pr-12 text-center font-body-aa text-base text-[#f0f4ff] outline-none transition-all placeholder:text-[#2d3f56]"
              style={{
                borderColor: error ? "rgba(249,115,22,0.6)" : "rgba(77,184,255,0.25)",
                boxShadow: error ? "0 0 0 3px rgba(249,115,22,0.12)" : undefined,
              }}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              tabIndex={-1}
              aria-label="Toggle password visibility"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b8aab] transition-colors hover:text-[#4db8ff]"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button
            type="button"
            onClick={tryAuth}
            className="press-aa w-full rounded-full bg-gradient-to-br from-[#4db8ff] to-[#1a8fcc] px-6 py-3 font-serif text-[0.55rem] uppercase tracking-[0.35em] text-[#04070d] shadow-[0_4px_18px_rgba(77,184,255,0.35)] transition-all hover:shadow-[0_6px_24px_rgba(77,184,255,0.5)]"
          >
            Enter the Avatar World
          </button>

          <div
            className="font-body-aa min-h-[1.2em] text-sm italic tracking-wide text-[#f97316] transition-opacity duration-300"
            style={{ opacity: error ? 1 : 0 }}
          >
            Incorrect password — try again
          </div>
        </div>

        <div className="absolute bottom-6 flex items-center gap-2 font-body-aa text-[0.4rem] uppercase tracking-[0.3em] text-[#2d3f56]">
          <Lock className="h-3 w-3" />
          <span>Fan-made archive · Not affiliated with Nickelodeon</span>
        </div>
      </div>
    </>
  );
}
