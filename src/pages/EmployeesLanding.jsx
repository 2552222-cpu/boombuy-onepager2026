import React, { useState, useEffect } from "react";
import NetLiftIntro from "../components/netlift/NetLiftIntro";
import NetLiftBenefits from "../components/netlift/NetLiftBenefits";
import NetLiftSurveyGate from "../components/netlift/NetLiftSurveyGate";
import NetLiftSurvey from "../components/netlift/NetLiftSurvey";
import NetLiftResult from "../components/netlift/NetLiftResult";

const FLOW_STEPS = ["intro", "benefits", "gate", "survey", "result"];

export default function EmployeesLanding() {
  const [step, setStep] = useState("intro");
  const [surveyResult, setSurveyResult] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const goNext = () => {
    const idx = FLOW_STEPS.indexOf(step);
    const next = FLOW_STEPS[idx + 1];
    if (next) setStep(next);
  };

  const handleSurveyFinish = (result, answers) => {
    setSurveyResult(result);
    setSurveyAnswers(answers);
    setStep("result");
  };

  const reset = () => {
    setSurveyResult(null);
    setSurveyAnswers(null);
    setStep("intro");
  };

  switch (step) {
    case "intro":
      return <NetLiftIntro onNext={goNext} />;
    case "benefits":
      return <NetLiftBenefits onNext={goNext} />;
    case "gate":
      return <NetLiftSurveyGate onNext={goNext} />;
    case "survey":
      return <NetLiftSurvey onFinish={handleSurveyFinish} />;
    case "result":
      return <NetLiftResult result={surveyResult} answers={surveyAnswers} onRestart={reset} />;
    default:
      return <NetLiftIntro onNext={goNext} />;
  }
}