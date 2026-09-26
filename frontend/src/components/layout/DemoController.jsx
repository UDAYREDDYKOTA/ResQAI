import React from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  FastForward, 
  Activity,
  Layers,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { DEMO_STORYLINE_STEPS } from "../../data/mockData";

export default function DemoController() {
  const {
    demoState,
    setDemoState,
    startDemo,
    pauseDemo,
    resumeDemo,
    nextDemoStep,
    prevDemoStep,
    resetDemo
  } = useOperational();

  const totalSteps = DEMO_STORYLINE_STEPS.length;
  const currentStepData = DEMO_STORYLINE_STEPS.find((s) => s.stepIndex === demoState.currentStep) || DEMO_STORYLINE_STEPS[0];

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 80,
      backgroundColor: "rgba(11, 15, 23, 0.94)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(56, 189, 248, 0.35)",
      borderRadius: "var(--radius-md)",
      boxShadow: "0 10px 35px rgba(0, 0, 0, 0.75)",
      padding: "10px 18px",
      display: "flex",
      alignItems: "center",
      gap: "18px",
      userSelect: "none",
      minWidth: "680px"
    }}>
      {/* Badge & Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          backgroundColor: demoState.isPlaying ? "rgba(239, 68, 68, 0.15)" : "rgba(56, 189, 248, 0.15)",
          border: demoState.isPlaying ? "1px solid rgba(239, 68, 68, 0.4)" : "1px solid rgba(56, 189, 248, 0.4)",
          padding: "4px 8px",
          borderRadius: "var(--radius-xs)",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          <span style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: demoState.isPlaying ? "var(--color-critical)" : "var(--color-info)",
            boxShadow: demoState.isPlaying ? "0 0 8px var(--color-critical)" : "0 0 6px var(--color-info)"
          }} />
          <span style={{
            fontSize: "10px",
            fontWeight: "700",
            fontFamily: "var(--font-mono)",
            color: demoState.isPlaying ? "var(--color-critical)" : "var(--color-info)"
          }}>
            {demoState.isPlaying ? "DEMO ACTIVE" : "DEMO READY"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
              STEP {demoState.currentStep} OF {totalSteps}
            </span>
            <span className="font-mono" style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
              [{currentStepData.time}]
            </span>
          </div>
          <div style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            maxWidth: "340px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {currentStepData.title}
          </div>
        </div>
      </div>

      <div style={{ width: "1px", height: "30px", backgroundColor: "var(--border-subtle)" }} />

      {/* Playback Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button
          onClick={prevDemoStep}
          disabled={demoState.currentStep <= 1}
          className="btn btn-secondary btn-xs"
          style={{ width: "28px", height: "28px", padding: 0 }}
          title="Previous Step"
        >
          <ChevronLeft size={14} />
        </button>

        {demoState.isPlaying ? (
          <button
            onClick={pauseDemo}
            className="btn btn-secondary btn-xs"
            style={{ width: "32px", height: "32px", padding: 0, backgroundColor: "var(--bg-surface-3)" }}
            title="Pause Simulation"
          >
            <Pause size={14} fill="white" />
          </button>
        ) : (
          <button
            onClick={() => (demoState.currentStep === totalSteps ? startDemo() : resumeDemo())}
            className="btn btn-primary btn-xs"
            style={{ width: "32px", height: "32px", padding: 0 }}
            title="Play Simulation"
          >
            <Play size={14} fill="#041019" />
          </button>
        )}

        <button
          onClick={nextDemoStep}
          disabled={demoState.currentStep >= totalSteps}
          className="btn btn-secondary btn-xs"
          style={{ width: "28px", height: "28px", padding: 0 }}
          title="Skip to Next Step"
        >
          <ChevronRight size={14} />
        </button>

        <button
          onClick={resetDemo}
          className="btn btn-ghost btn-xs"
          style={{ width: "28px", height: "28px", padding: 0 }}
          title="Restart Demo"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      <div style={{ width: "1px", height: "30px", backgroundColor: "var(--border-subtle)" }} />

      {/* Speed Multiplier & Quick Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {[1, 2].map((spd) => (
          <button
            key={spd}
            onClick={() => setDemoState((prev) => ({ ...prev, speedMultiplier: spd }))}
            style={{
              padding: "3px 7px",
              fontSize: "10.5px",
              fontFamily: "var(--font-mono)",
              fontWeight: "600",
              borderRadius: "var(--radius-xs)",
              border: demoState.speedMultiplier === spd ? "1px solid var(--color-info)" : "1px solid var(--border-subtle)",
              backgroundColor: demoState.speedMultiplier === spd ? "rgba(56, 189, 248, 0.15)" : "transparent",
              color: demoState.speedMultiplier === spd ? "var(--color-info)" : "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            {spd}x
          </button>
        ))}
      </div>
    </div>
  );
}
