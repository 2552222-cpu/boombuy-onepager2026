import React, { useEffect, useState } from "react";
import NetLiftIntro from "../components/netlift/NetLiftIntro";
import NetLiftBenefits from "../components/netlift/NetLiftBenefits";
import NetLiftSurveyGate from "../components/netlift/NetLiftSurveyGate";
import NetLiftSurvey from "../components/netlift/NetLiftSurvey";
import NetLiftResult from "../components/netlift/NetLiftResult";

// FLOW: intro → benefits → gate → survey → result
const STEPS = ["intro", "benefits", "gate", "survey", "result"];

export default function EmployeesLanding() {
  const [step, setStep] = useState("intro");
  const [surveyResult, setSurveyResult] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (history.scrollRestoration) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orgKey = params.get("orgKey");
    if (orgKey) window.location.replace(`/join/${orgKey}`);
  }, []);

  // Scroll to top on every step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleSurveyComplete = (result, answers) => {
    setSurveyResult(result);
    setSurveyAnswers(answers);
    setStep("result");
  };

  return (
    <div dir="rtl" style={{ fontFamily: "var(--font-heebo)", overflowX: "hidden", maxWidth: "100vw" }}>
      {step === "intro" && (
        <NetLiftIntro onStart={() => setStep("benefits")} />
      )}
      {step === "benefits" && (
        <NetLiftBenefits onContinue={() => setStep("gate")} />
      )}
      {step === "gate" && (
        <NetLiftSurveyGate onContinue={() => setStep("survey")} />
      )}
      {step === "survey" && (
        <NetLiftSurvey onComplete={handleSurveyComplete} />
      )}
      {step === "result" && (
        <NetLiftResult
          result={surveyResult}
          answers={surveyAnswers}
          onRestart={() => setStep("intro")}
        />
      )}
    </div>
  );
}