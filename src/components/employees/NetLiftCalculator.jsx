import React, { useState } from "react";
import NetLiftSurvey from "../netlift/NetLiftSurvey";
import NetLiftResult from "../netlift/NetLiftResult";

// Flow: survey → result (direct, no extra intro screen)
export default function NetLiftCalculator() {
  const [step, setStep] = useState("survey");
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState(null);

  const handleComplete = (res, ans) => {
    setResult(res);
    setAnswers(ans);
    setStep("result");
  };

  if (step === "survey") return <NetLiftSurvey onFinish={handleComplete} />;
  if (step === "result") return <NetLiftResult result={result} answers={answers} onRestart={() => setStep("survey")} />;
  return null;
}