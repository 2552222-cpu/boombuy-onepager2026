/**
 * Canonical message builders — single source of truth for all share/letter messages.
 * All components MUST import from here. No local message functions allowed.
 */

const BASE_URL = "https://boom-perk-flow.base44.app";
const PREVIEW_LINK = "https://boom-perk-flow.base44.app/#offers-slider";
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
 * Employee WhatsApp share message — 3 stages based on count.
 * Includes both the benefits preview link and the org join link.
 */
export function buildWaMessage(orgName, orgKey, count, refId) {
  const link = buildOrgLink(orgKey, refId);

  if (count >= TARGET_2) {
    return `היי, כבר ${count} עובדים מ-${orgName} בפנים.

הבקשה כבר צוברת משקל - זה בדיוק השלב להצטרף כדי שנוכל לקדם את זה מול הארגון.

רוצים קודם לראות דוגמאות מההטבות?
${PREVIEW_LINK}

מי שעוד לא נכנס - מצטרפים לבקשה כאן:
${link}

ככל שיותר עובדים יצטרפו, יהיה קל יותר לקדם את זה מול הרווחה, הוועד או ההנהלה.`;
  }

  if (count >= TARGET_1) {
    const remaining = TARGET_2 - count;
    return `היי, כבר ${count} עובדים מ-${orgName} הצטרפו לבקשה.

מדובר בשכבה נוספת של הטבות וערך כלכלי לעובדים לאורך כל השנה - בנוסף למה שכבר קיים בארגון.

רוצים קודם לראות דוגמאות מההטבות?
${PREVIEW_LINK}

אם זה נראה לכם רלוונטי, מצטרפים לבקשה כאן:
${link}

חסרים עוד ${remaining} להגיע ל-${TARGET_2} - ככל שיותר יצטרפו, יהיה קל יותר לקדם מול הרווחה, הוועד או ההנהלה.`;
  }

  return `היי, פתחנו בקשה להביא את בום ביי ל-${orgName}.

מדובר בשכבה נוספת של הטבות וערך כלכלי לעובדים לאורך כל השנה - בנוסף למה שכבר קיים בארגון.

רוצים קודם לראות דוגמאות מההטבות?
${PREVIEW_LINK}

אם זה נראה לכם רלוונטי, מצטרפים לבקשה כאן:
${link}

ככל שיותר עובדים יצטרפו, יהיה קל יותר לקדם את זה מול הרווחה, הוועד או ההנהלה.`;
}

/**
 * Management / HR / union letter — formal, professional.
 */
export function buildLetterMessage(orgName, orgKey, count, insights = {}) {
  const link = buildOrgLink(orgKey);
  const { painPoint, currentClub, holidayBudget, welfareBudget } = insights;

  let insightsSection = "";
  if (painPoint) {
    insightsSection += `\nמהסקר שמילאו העובדים עולה כי הכאב המרכזי הוא: ${painPoint}.`;
  }
  if (currentClub === "אין כלום כרגע") {
    insightsSection += "\nכרגע אין מועדון הטבות פעיל בארגון - כלומר, מדובר בשדרוג משמעותי מהמצב הקיים.";
  }
  if (welfareBudget === "לא ממש") {
    insightsSection += "\nהמהלך מתאפשר ללא הגדלת תקציב רווחה, מה שהופך אותו לרלוונטי במיוחד.";
  }
  if (holidayBudget && holidayBudget !== "לא מקבלים מתנות") {
    insightsSection += `\nתקציב מתנת החג הקיים: ${holidayBudget} לעובד.`;
  }

  return `שלום,

אנחנו קבוצה של עובדים מ-${orgName} שמעוניינת לבחון צירוף של בום ביי לארגון.

כבר *${count} עובדים* מתוך הארגון הצטרפו לבקשה.${insightsSection}

*הערך המרכזי לעובדים - בנוסף למה שכבר קיים:*
- הנחות קבועות על סופר ופארם
- הטבות על מוצרי חשמל, מותגים ואלקטרוניקה
- חופשות, תרבות ומתנות חג גמישות

מבחינת הארגון, המהלך נשען על שימוש חכם יותר בתקציב הקיים, *ללא צורך להוסיף תקציב חדש*.

נשמח לתאם דמו קצר של 15 דקות.

קישור לעמוד הבקשה:
${link}

*דברו איתנו בוואטסאפ:*
https://wa.me/972542552222`;
}