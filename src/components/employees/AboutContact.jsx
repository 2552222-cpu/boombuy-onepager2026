import React from "react";
import { CONTACT } from "@/components/seo/siteIdentity";
import { ABOUT_TEXT } from "@/components/employees/homeContent";

export default function AboutContact() {
  return (
    <section id="about-contact" dir="rtl" className="bb-section bg-background px-4 text-foreground" aria-labelledby="about-heading">
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="about-heading" className="text-3xl font-bold">מי עומד מאחורי המועדון?</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed md:text-lg">{ABOUT_TEXT}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-base">
          <a className="underline underline-offset-4" href={CONTACT.companyUrl} target="_blank" rel="noopener noreferrer">אתר החברה: boombuy.co.il</a>
          <a className="underline underline-offset-4" dir="ltr" href={`tel:${CONTACT.telephone}`}>{CONTACT.phone}</a>
          <a className="max-w-full break-all underline underline-offset-4" dir="ltr" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </div>
    </section>
  );
}