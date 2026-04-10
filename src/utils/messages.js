/**
 * Canonical message builders — single source of truth for all share/letter messages.
 * All components MUST import from here. No local message functions allowed.
 */

const BASE_URL = "https://boom-perk-flow.base44.app";
const TARGET_1 = 10;
const TARGET_2 = 20;

export function buildOrgLink(orgKey) {
  return `${BASE_URL}/join/${encodeURIComponent(orgKey)}`;
}

/**
 * Employee WhatsApp share message — 3 stages based on count.
 */
export function buildWaMessage(orgName, orgKey, count) {
  const link = buildOrgLink(orgKey);

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
export function buildLetterMessage(orgName, orgKey, count) {
  const link = buildOrgLink(orgKey);
  return `שלום,\n\nאנחנו קבוצה של עובדים מ-${orgName} שמעוניינת לבחון צירוף של BoomBuy לארגון.\n\nכבר ${count} עובדים מתוך הארגון הצטרפו לבקשה.\n\nהערך המרכזי לעובדים:\n• הנחות קבועות על סופר ופארם\n• מחירים חזקים על מוצרי חשמל ומותגים\n• חופשות, תרבות ומתנות חג גמישות\n\nמבחינת הארגון, המהלך נשען על שימוש חכם יותר בתקציב הקיים, בלי צורך להוסיף תקציב חדש.\n\nנשמח לתאם דמו קצר של 15 דקות כדי להבין אם ואיך זה יכול להתאים גם לארגון שלנו.\n\nקישור לעמוד הבקשה:\n${link}\n\nלתיאום:\nארי - 054-255-2222\nוואטסאפ:\nhttps://wa.me/972542552222`;
}