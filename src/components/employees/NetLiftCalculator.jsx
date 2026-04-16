import React, { useState } from "react";
import NetLiftIntro from "../netlift/NetLiftIntro";
import NetLiftSurvey from "../netlift/NetLiftSurvey";
import NetLiftResult from "../netlift/NetLiftResult";

// Flow: intro → survey → result (locked, no backwards reset)
export default function NetLiftCalculator({ onAdvance }) {
  const [step, setStep] = useState("intro");
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState(null);

  const handleComplete = (res, ans) => {
    setResult(res);
    setAnswers(ans);
    setStep("result");
    if (onAdvance && res) onAdvance();
  };

  if (step === "intro") return <NetLiftIntro onNext={() => setStep("survey")} />;
  if (step === "survey") return <NetLiftSurvey onFinish={handleComplete} />;
  if (step === "result") return <NetLiftResult result={result} answers={answers} onRestart={() => setStep("intro")} onNext={onAdvance} />;
  return null;
}