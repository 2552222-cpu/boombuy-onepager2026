import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import GroupRequestBlock from "./GroupRequestBlock";

export default function JoinScreen({ orgKey, orgName, onContinue }) {
  const [count, setCount] = useState(0);
  const [groupRequestId, setGroupRequestId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const requests = await base44.entities.GroupRequest.filter({ orgKey });
      const active = requests.filter(r => r.status === "collecting" || r.status === "ready_to_send");
      if (active.length > 0) {
        const gr = active[0];
        setGroupRequestId(gr.id);
        const sigs = await base44.entities.GroupSignature.filter({ groupRequestId: gr.id });
        setCount(sigs.length);
      }
    };
    if (orgKey) init();
  }, [orgKey]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/40 flex flex-col items-center justify-center px-4 py-16" dir="rtl">
      <div className="max-w-md w-full flex flex-col gap-6">
        <GroupRequestBlock
          defaultOrgKey={orgKey}
          defaultOrgName={orgName}
        />
        <button
          onClick={onContinue}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 text-center"
        >
          המשך לעמוד
        </button>
      </div>
    </div>
  );
}