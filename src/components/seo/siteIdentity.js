// Shared by the HTML build and route metadata. Logo is the original approved mark.
export const SITE_ORIGIN = "https://boombuyonepage.com";
export const HOME_TITLE = "בום ביי | מועדון הטבות לעובדים במותג הארגון";
export const HOME_DESCRIPTION = "בום ביי מקימה ומפעילה מועדון הטבות בשם הארגון, לצד פעילות הרווחה הקיימת. הכירו דוגמאות להטבות, את תהליך ההקמה והשירות, ובדקו התאמה.";
export const CONTACT = {
  companyUrl: "https://boombuy.co.il/",
  phone: "054-2552222",
  telephone: "+972542552222",
  email: "support@boombuy.co.il",
};
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org", "@type": "Organization",
  "@id": SITE_ORIGIN + "/#organization", name: "boombuy", alternateName: "בום ביי",
  url: SITE_ORIGIN + "/",
  logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/4cebf7412_15.png",
  description: "פלטפורמה ישראלית שמקימה ומפעילה מועדון הטבות לעובדים במותג הארגון.",
  contactPoint: {
    "@type": "ContactPoint", telephone: CONTACT.telephone, email: CONTACT.email,
    contactType: "customer support", areaServed: "IL", availableLanguage: ["Hebrew"],
  },
};
export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org", "@type": "WebSite",
  "@id": SITE_ORIGIN + "/#website", name: "boombuy", alternateName: "בום ביי",
  url: SITE_ORIGIN + "/", description: HOME_DESCRIPTION, inLanguage: "he-IL",
  publisher: { "@id": ORGANIZATION_JSON_LD["@id"] },
};