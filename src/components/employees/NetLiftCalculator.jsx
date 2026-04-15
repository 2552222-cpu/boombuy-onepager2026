import React, { useState } from "react";
import NetLiftIntro from "../netlift/NetLiftIntro";
import NetLiftBenefits from "../netlift/NetLiftBenefits";
import NetLiftSurvey from "../netlift/NetLiftSurvey";
import NetLiftResult from "../netlift/NetLiftResult";

// step: "intro" | "benefits" | "survey" | "result"
export default function NetLiftCalculator({ onAdvance }) {
  const [step, setStep] = useState("intro");
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState(null);

  const handleComplete = (res, ans) => {
    if (!res) return; // no result without full user input — stay on survey
    setResult(res);
    setAnswers(ans);
    setStep("result");
    if (onAdvance) onAdvance();
  };

  if (step === "intro") return <NetLiftIntro onStart={() => setStep("benefits")} />;
  if (step === "benefits") return <NetLiftBenefits onContinue={() => setStep("survey")} />;
  if (step === "survey") return <NetLiftSurvey onComplete={handleComplete} />;
  if (step === "result") return <NetLiftResult result={result} answers={answers} onRestart={() => setStep("intro")} />;
  return null;
}