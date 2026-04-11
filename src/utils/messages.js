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
 * Employee WhatsApp share message — 3 stages based on count.
 */
export function buildWaMessage(orgName, orgKey, count, refId) {
  const link = buildOrgLink(orgKey, refId);

  if (count >= TARGET_2) {
    return `היי, כבר ${count} עובדים מ-${orgName} בפנים.\n\nהבקשה כבר צוברת משקל, וזה בדיוק השלב להצטרף כדי שנוכל לקדם את זה בצורה רצינית מול הארגון.\n\nמי שעוד לא נכנס - זה הלינק:\n${link}`;
  }

  if (count >= TARGET_1) {
    const remaining = TARGET_2 - count;
    return `היי, כבר ${count} עובדים מ-${orgName} הצטרפו לבקשה להביא את BoomBuy לארגון.\n\nזה אומר הטבות אמיתיות לעובדים - סופר, חופשות, חשמל, מותגים ועוד - בלי תוספת תקציב לארגון.\n\nחסרים עוד ${remaining} כדי שנוכל להעביר את זה בצורה הרבה יותר חזקה לרווחה / לוועד / להנהלה.\n\nמצטרפים כאן:\n${link}`;
  }

  return `היי, פתחנו בקשה להביא את BoomBuy ל-${orgName}.\n\nמדובר בהטבות אמיתיות לעובדים - סופר, חופשות, חשמל, מותגים ועוד - בלי שהארגון יצטרך להוסיף תקציב.\n\nלוקח 10 שניות להצטרף, וככל שיותר עובדים יצטרפו יהיה הרבה יותר קל לקדם את זה מול הרווחה / הוועד / ההנהלה.\n\nמצטרפים כאן:\n${link}`;
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

  return `שלום,\n\nאנחנו קבוצה של עובדים מ-${orgName} שמעוניינת לבחון צירוף של BoomBuy לארגון.\n\nכבר ${count} עובדים מתוך הארגון הצטרפו לבקשה.${insightsSection}\n\nהערך המרכזי לעובדים:\n- הנחות קבועות על סופר ופארם\n- מחירים חזקים על מוצרי חשמל ומותגים\n- חופשות, תרבות ומתנות חג גמישות\n\nמבחינת הארגון, המהלך נשען על שימוש חכם יותר בתקציב הקיים, בלי צורך להוסיף תקציב חדש.\n\nנשמח לתאם דמו קצר של 15 דקות כדי להבין אם ואיך זה יכול להתאים גם לארגון שלנו.\n\nקישור לעמוד הבקשה:\n${link}\n\nלתיאום:\nארי - 054-255-2222\nוואטסאפ:\nhttps://wa.me/972542552222`;
}