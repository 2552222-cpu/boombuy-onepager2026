import React, { useState } from "react";
import NetLiftIntro from "../netlift/NetLiftIntro";
import NetLiftSurvey from "../netlift/NetLiftSurvey";
import NetLiftResult from "../netlift/NetLiftResult";

// step: "intro" | "survey" | "result"
export default function NetLiftCalculator({ onAdvance }) {
  const [step, setStep] = useState("intro");
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState(null);

  const handleComplete = (res, ans) => {
    setResult(res);
    setAnswers(ans);
    setStep("result");
    if (onAdvance) onAdvance();
  };

  if (step === "intro") return <NetLiftIntro onStart={() => setStep("survey")} />;
  if (step === "survey") return <NetLiftSurvey onComplete={handleComplete} />;
  if (step === "result") return <NetLiftResult result={result} answers={answers} onRestart={() => setStep("intro")} />;
  return null;
}