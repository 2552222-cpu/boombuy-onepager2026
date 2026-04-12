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
    return `היי, פתחנו בקשה להביא את בום ביי ל-${orgName}.

מדובר במהלך שיכול לעזור לעובדים להוציא יותר מהשכר בלי לבקש העלאה, דרך שכבה נוספת של הטבות וערך כלכלי לאורך השנה - בנוסף למה שכבר קיים בארגון.

כבר ${count} עובדים הצטרפו לבקשה.

כדי לראות במה מדובר ולהצטרף לבקשה:
${link}`;
  }

  if (count >= TARGET_1) {
    return `היי, פתחנו בקשה להביא את בום ביי ל-${orgName}.

מדובר במהלך שיכול לעזור לעובדים להוציא יותר מהשכר בלי לבקש העלאה, דרך שכבה נוספת של הטבות וערך כלכלי לאורך השנה - בנוסף למה שכבר קיים בארגון.

כבר ${count} עובדים הצטרפו.

כדי לראות במה מדובר ולהצטרף לבקשה:
${link}`;
  }

  return `היי, פתחנו בקשה להביא את בום ביי ל-${orgName}.

מדובר במהלך שיכול לעזור לעובדים להוציא יותר מהשכר בלי לבקש העלאה, דרך שכבה נוספת של הטבות וערך כלכלי לאורך השנה - בנוסף למה שכבר קיים בארגון.

כדי לראות במה מדובר ולהצטרף לבקשה:
${link}`;
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