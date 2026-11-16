import React from "react";
import { PROGRAM_DETAILS } from "./programDetails";

export default function ProgramDetails() {
  return <section id="welfare-program" dir="rtl" className="bb-section bb-program" aria-label="עלויות ומתנות לעובדים">
    <style>{`
      .bb-program{padding:56px 24px;background:#FBFAF8;font-family:var(--font-heebo),Heebo,Arial,sans-serif;scroll-margin-top:90px}
      .bb-program-wrap{max-width:1040px;margin:0 auto;display:grid;gap:24px}
      .bb-program article{padding:28px;border:1px solid #dedbd5;border-radius:20px;background:#fff;min-width:0}
      .bb-program h2{font-size:clamp(23px,2.8vw,32px);line-height:1.3;font-weight:750;color:#17191D;margin:0 0 16px}
      .bb-program p{font-size:17px;line-height:1.8;color:#3A3C42;margin:0;overflow-wrap:anywhere}
      .bb-program details{border-top:1px solid #e7e3dd;margin-top:18px;padding-top:14px}
      .bb-program summary{cursor:pointer;font-size:17px;line-height:1.6;font-weight:650;color:#17191D;padding:7px 0}
      .bb-program summary:focus-visible{outline:3px solid #c24a2c;outline-offset:4px;border-radius:3px}
      .bb-program details p{margin-top:12px}
      @media(max-width:600px){.bb-program{padding:36px 16px;scroll-margin-top:72px}.bb-program article{padding:22px 18px}.bb-program p{font-size:16px}}
    `}</style>
    <div className="bb-program-wrap">{PROGRAM_DETAILS.map((item,index)=><article key={item.title} id={["plus-plan","premium-plan","club-costs","holiday-gifts","birthday-gifts"][index]}>
      <h2>{item.title}</h2><p>{item.text}</p>
      {item.questions?.map(qa=><details key={qa.q}><summary>{qa.q}</summary><p>{qa.a}</p></details>)}
    </article>)}</div>
  </section>;
}
