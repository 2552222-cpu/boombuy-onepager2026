import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import ResultScreen from "./ResultScreen";
import RequestModal from "./RequestModal";
import ShareScreen from "./ShareScreen";

const questions = [
  {
    q: "מה ההוצאה שהכי כואבת לך כרגע?",
    options: [
      { emoji: "🛒", label: "קניות בסופר ובפארם" },
      { emoji: "📱", label: "חשמל וגאדג'טים" },
      { emoji: "✈️", label: "חופשות ובילויים" },
      { emoji: "👗", label: "בגדים ומותגים" },
    ],
  },
  {
    q: "אם באותו תקציב היית מקבל גם מתנות לחג וגם הטבות ביומיום - כמה זה היה משנה לך?",
    options: [
      { emoji: "💚", label: "זה היה משנה לי את החודש" },
      { emoji: "🙏", label: "הייתי מרגיש שבאמת דואגים לי" },
      { emoji: "🎯", label: "זה בדיוק מה שחסר פה" },
    ],
  },
  {
    q: "כמה עובדים יש בארגון שלך?",
    options: [
      { emoji: "👤", label: "עד 50 עובדים" },
      { emoji: "👥", label: "50-250 עובדים" },
      { emoji: "🏢", label: "מעל 250 עובדים" },
    ],
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [groupRequest, setGroupRequest] = useState(null);
  const [orgKey, setOrgKey] = useState(null);
  const [sessionToken, setSessionToken] = useState("");

  // Generate session token on mount
  useEffect(() => {
    const token = `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionToken(token);
  }, []);

  const handleSelect = async (option) => {
    const newAnswers = [...answers, option.label];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      
      // Save survey response to DB
      try {
        await base44.entities.SurveyResponse.create({
          answer1: newAnswers[0],
          answer2: newAnswers[1],
          answer3: newAnswers[2],
          sessionToken: sessionToken,
        });
      } catch (err) {
        console.error("Error saving survey response:", err);
      }

      setTimeout(() => {
        setLoading(false);
        setShowResult(true);
      }, 1500);
    }
  };

  const handleOpenRequest = async (group, key) => {
    setGroupRequest(group);
    setOrgKey(key);
    setShowRequestModal(false);
  };

  const progress = ((step + (showResult ? 1 : 0)) / questions.length) * 100;

  if (showResult) {
    return (
      <div style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        <ResultScreen
          surveyResult={answers}
          sessionToken={sessionToken}
          onOpenRequest={() => setShowRequestModal(true)}
        />
        <RequestModal
          isOpen={showRequestModal}
          sessionToken={sessionToken}
          onClose={() => setShowRequestModal(false)}
          onSuccess={(group, key) => {
            handleOpenRequest(group, key);
            setGroupRequest(group);
            setOrgKey(key);
          }}
        />
        {groupRequest && (
          <ShareScreen
            groupRequest={groupRequest}
            orgKey={orgKey}
            onContinue={() => {
              setShowResult(false);
              setShowRequestModal(false);
              setGroupRequest(null);
              setOrgKey(null);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <section id="survey-section" className="py-10 md:py-20 bg-secondary/30" style={{ overflowX: 'hidden', maxWidth: '100vw', padding: '20px 16px' }}>
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2 text-xs md:text-sm">
              <span className="text-muted-foreground font-medium">
                שאלה {step + 1} מתוך {questions.length}
              </span>
              <span className="text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-border rounded-full overflow-hidden" style={{ height: '4px' }}>
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm">מכין את התוצאה שלך...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-base md:text-2xl font-bold mb-4 md:mb-6 text-center leading-tight">
                  {questions[step].q}
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      className="w-full bg-white border border-border/60 rounded-lg md:rounded-xl text-right flex items-center gap-3 hover:border-primary/40 hover:bg-accent/30 transition-all duration-200 group"
                      style={{ padding: '14px 16px' }}
                    >
                      <span className="text-lg md:text-xl flex-shrink-0">{opt.emoji}</span>
                      <span className="font-medium text-sm md:text-base group-hover:text-primary transition-colors text-right">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}