import React, { useState } from "react";
import NetLiftIntro from "../netlift/NetLiftIntro";
import NetLiftBenefits from "../netlift/NetLiftBenefits";
import NetLiftSurveyGate from "../netlift/NetLiftSurveyGate";
import NetLiftSurvey from "../netlift/NetLiftSurvey";
import NetLiftResult from "../netlift/NetLiftResult";

// step: "intro" | "benefits" | "gate" | "survey" | "result"
export default function NetLiftCalculator({ onAdvance }) {
  const [step, setStep] = useState("intro");
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState(null);

  const handleComplete = (res, ans) => {
    if (!res) return;
    setResult(res);
    setAnswers(ans);
    setStep("result");
    if (onAdvance) onAdvance();
  };

  if (step === "intro") return <NetLiftIntro onNext={() => setStep("benefits")} />;
  if (step === "benefits") return <NetLiftBenefits onNext={() => setStep("gate")} />;
  if (step === "gate") return <NetLiftSurveyGate onNext={() => setStep("survey")} />;
  if (step === "survey") return <NetLiftSurvey onFinish={handleComplete} />;
  if (step === "result") return <NetLiftResult result={result} answers={answers} onRestart={() => setStep("intro")} />;
  return null;
}