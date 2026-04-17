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
    return `היי, פתחנו בקשה להביא את BoomBuy ל-${orgName}.

מדובר במהלך שיכול לעזור לעובדים להוציא יותר מהשכר בלי לבקש העלאה, דרך שכבה נוספת של הטבות וערך כלכלי לאורך השנה - בנוסף למה שכבר קיים בארגון.

כבר ${count} עובדים הצטרפו לבקשה.

כדי לראות במה מדובר ולהצטרף לבקשה:
${link}`;
  }

  if (count >= TARGET_1) {
    return `היי, פתחנו בקשה להביא את BoomBuy ל-${orgName}.

מדובר במהלך שיכול לעזור לעובדים להוציא יותר מהשכר בלי לבקש העלאה, דרך שכבה נוספת של הטבות וערך כלכלי לאורך השנה - בנוסף למה שכבר קיים בארגון.

כבר ${count} עובדים הצטרפו.

כדי לראות במה מדובר ולהצטרף לבקשה:
${link}`;
  }

  return `היי 👋

פתחתי בקשה להביא את BoomBuy ל-${orgName}.

בדקתי את המחשבון שלהם — הנטו שלי יכול לגדול בצורה משמעותית מהוצאות שאני עושה בכל מקרה: סופר, חשמל, ביטוח, חופשות.

זה לא עולה לארגון כלום — הטבות קיימות, רק לא מנוצלות.

כדי שזה יקרה, צריך שעוד עובדים יצטרפו לבקשה. לוקח 10 שניות:
${link}`;
}

/**
 * Management / HR / union letter — formal, professional, non-accusatory.
 */
export function buildLetterMessage(orgName, orgKey, count, insights = {}) {
  const link = buildOrgLink(orgKey);

  return `שלום,

אנחנו קבוצה של עובדים מ-${orgName} שמעוניינת לבחון צירוף של BoomBuy לארגון שלנו.

מנקודת המבט של העובדים, מדובר בשכבה נוספת של הטבות וערך כלכלי מתמשך לאורך השנה - בהוצאות כמו סופר, פארם, חשמל, חופשות ומותגים.

מנקודת המבט של הארגון, BoomBuy לא באה במקום מתנות חג או פעילות רווחה קיימת, אלא בנוסף. המטרה היא לאפשר לעובדים ליהנות מיותר ערך כלכלי לאורך השנה, בצורה שיכולה לסייע להם להוציא יותר מהשכר בלי לבקש העלאה, בלי להכביד על המעסיק.

כבר ${count} עובדים מתוך הארגון הצטרפו לבקשה הזו.

נשמח לבדוק התאמה קצרה ולראות אם זה יכול להתאים גם לארגון שלנו.

לינק לעמוד הבקשה:
${link}

דברו איתנו בוואטסאפ:
https://wa.me/972542552222`;
}