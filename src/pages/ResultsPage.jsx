import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
import GlobalHeader from "../components/employees/GlobalHeader";
import GlobalFooter from "../components/employees/GlobalFooter";
import { Phone } from "lucide-react";

export default function ResultsPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgName, setOrgName] = useState("");
  const [orgKey, setOrgKey] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("orgKey") || "";
    setOrgKey(key);

    const fetchResponses = async () => {
      try {
        let data;
        if (key) {
          data = await base44.entities.SurveyResponse.filter({ orgKey: key });
          if (data.length > 0) {
            setOrgName(data[0].orgName || key);
          }
        } else {
          data = await base44.entities.SurveyResponse.list("-created_date");
        }
        setResponses(data);
      } catch (err) {
        console.error("Error fetching responses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();

    // Subscribe to real-time updates
    const unsubscribe = base44.entities.SurveyResponse.subscribe((event) => {
      if (event.type === 'create' || event.type === 'update') {
        fetchResponses();
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate stats
  const answer1Counts = {};
  const answer2Count = responses.filter(r => r.answer2?.includes("משנה לי את החודש")).length;
  
  responses.forEach(r => {
    answer1Counts[r.answer1] = (answer1Counts[r.answer1] || 0) + 1;
  });

  const answer1Data = Object.entries(answer1Counts).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const answer2Percentage = responses.length > 0 ? Math.round((answer2Count / responses.length) * 100) : 0;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen font-heebo flex flex-col" dir="rtl" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <GlobalHeader />
      
      <div className="flex-1 bg-gradient-to-b from-white to-secondary/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-black mb-2 text-foreground">
                {orgName ? `${orgName} — מה העובדים שלך אומרים` : "מה העובדים שלנו אומרים"}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                {responses.length} עובדים כבר ענו
              </p>
            </div>

            {responses.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-border">
                <p className="text-muted-foreground">אין תשובות עדיין</p>
              </div>
            ) : (
              <>
                {/* Graph 1 - What's most painful */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm">
                  <h2 className="text-lg md:text-xl font-bold mb-6 text-foreground">
                    מה הכי כואב לעובדים?
                  </h2>
                  <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={answer1Data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {answer1Data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Graph 2 - Impact percentage */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm">
                  <h2 className="text-lg md:text-xl font-bold mb-6 text-foreground">
                    {answer2Percentage}% מהעובדים אמרו:
                  </h2>
                  <p className="text-center text-3xl md:text-4xl font-black text-primary mb-4">
                    "זה היה משנה לי את החודש"
                  </p>
                  <p className="text-center text-muted-foreground">
                    עובדים שמרגישים שהחברה דואגת להם מדווחים על 34% יותר שביעות רצון
                  </p>
                </div>

                {/* Stat 3 - Response count */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/25 text-center">
                  <p className="text-5xl md:text-6xl font-black text-primary mb-2">
                    {responses.length}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    עובדים כבר בדקו
                  </p>
                </div>
              </>
            )}

            {/* CTA Block */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm">
              <h3 className="text-lg md:text-xl font-black mb-4 text-foreground">
                רוצה לתת לעובדים שלך יותר?
              </h3>
              <p className="text-muted-foreground mb-6">
                זה לא עולה לך שקל נוסף.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-lg transition-all text-center"
                >
                  קבע דמו — 15 דקות
                </a>
                <a
                  href="tel:0542552222"
                  className="flex-1 bg-white border border-primary text-primary hover:bg-primary/5 font-bold py-4 rounded-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  חייג עכשיו — ארי
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <GlobalFooter />
    </div>
  );
}