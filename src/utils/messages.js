/**
 * Canonical message builders — single source of truth for all share/letter messages.
 * All components MUST import from here. No local message functions allowed.
 */

const BASE_URL = "https://boom-perk-flow.base44.app";
const TARGET_1 = 10;
const TARGET_2 = 20;

export function buildOrgLink(orgKey, refId) {
  const base = `${BASE_URL}/join/${encodeURIComponent(orgKey)}`;
  return refId ? `${base}?ref=${encodeURIComponent(refId)}` : base;
}

/**
 * Build structured insights from GroupRequest data for use in letters.
 */
export function buildSurveyInsights(groupData) {
  if (!groupData) return {};
  return {
    painPoint: groupData.painPoint || groupData.activities?.[0] || null,
    currentClub: groupData.currentClub || groupData.activities?.[1] || null,
    welfareBudget: groupData.welfareBudget || groupData.activities?.[2] || null,
    holidayBudget: groupData.holidayBudget || null,
    count: groupData.currentCount || 1,
  };
}

/**
 * Employee WhatsApp share message — single link only to org page.
 */
export function buildWaMessage(orgName, orgKey, count, refId) {
  const link = buildOrgLink(orgKey, refId);

  if (count >= TARGET_2) {
    return `היי 👋

כבר ${count} עובדים מ${orgName} הצטרפו לבקשה להכניס את בום ביי לארגון.

בום ביי נותנת לעובדים הנחות על סופר, חשמל, חופשות ועוד, בלי שהארגון משלם שקל נוסף.

כל הצטרפות נוספת מחזקת את הפנייה.

מצטרפים כאן:
${link}`;
  }

  if (count >= TARGET_1) {
    const remaining = TARGET_2 - count;
    return `היי 👋

כבר ${count} עובדים מ${orgName} הצטרפו לבקשה להכניס את בום ביי לארגון.

בום ביי נותנת לעובדים הנחות על סופר, חשמל, חופשות ועוד, בלי שהארגון משלם שקל נוסף.

חסרים עוד ${remaining} להגיע ל-20.

מצטרפים כאן:
${link}`;
  }

  return `היי 👋

ידעתם שניתן להגדיל את הנטו שלנו דרך מקום העבודה?

בום ביי נותנת לעובדים הנחות על סופר, חשמל, חופשות ועוד, בלי שהארגון משלם שקל נוסף.

ככל שיותר עובדים יצטרפו לבקשה, כך גדל הסיכוי שזה יקרה.

בדקו כמה הנטו שלכם יכול לגדול והצטרפו:
${link}`;
}

/**
 * Management / HR / union letter — formal, professional, non-accusatory.
 */
export function buildLetterMessage(orgName, orgKey, count, insights = {}) {
  const link = buildOrgLink(orgKey);
  const { painPoint } = insights;

  return `שלום,

אנחנו קבוצה של עובדים מ${orgName} שמעוניינת לבחון הצטרפות לפלטפורמת בום ביי.

בום ביי מאפשרת לעובדים להגדיל את הנטו האפקטיבי שלהם באמצעות כוח קנייה ארגוני. המשמעות בפועל: חיסכון קבוע על קניות בסופר, מוצרי חשמל ואלקטרוניקה במחירי יבואן, חופשות והופעות בהנחות בלעדיות ועוד הטבות לאורך כל השנה.${painPoint ? `\n\nמהסקר שמילאו העובדים עולה כי הכאב המרכזי הוא: ${painPoint}.` : ""}

המודל לא מצריך תוספת תקציב מהארגון. בום ביי עובדת על בסיס כוח הקנייה הקולקטיבי של העובדים.

כבר ${count} עובדים מ${orgName} הצטרפו לבקשה זו.

נשמח לתאם שיחת היכרות קצרה של 15 דקות.

לצפייה בעמוד הבקשה:
${link}

ליצירת קשר ישיר:
https://wa.me/972542552222`;
}