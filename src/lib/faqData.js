// Single source of truth for the landing FAQ (visible accordion).
//
// index.html carries a MIRRORED copy of these questions and answers: the FAQPage
// JSON-LD block plus the no-JS <dl> fallback inside #root, for crawlers that do not
// run JavaScript. When an answer changes here, update index.html to match — do NOT
// inject a second runtime JSON-LD block, otherwise Google sees duplicate FAQPage
// entities that contradict each other.
//
// `featured` items are always visible; the rest are revealed by the "עוד שאלות" toggle.
// Every item stays in the DOM (inside <details>) for SEO/AI readability.
export const FAQ_ITEMS = [
  {
    q: "מה כלול ומה העלות?",
    a: "לחברות עד 1,000 עובדים יש מסלול חינם עם אתר הטבות. מועדון ממותג בשם הארגון עולה 10 ₪ לעובד לחודש, וארגון שמעביר דרכנו את מתנות החג מקבל עליו זיכוי.",
    featured: true,
  },
  {
    q: "מה הארגון צריך לעשות?",
    a: "לאשר מדיניות, זכאות ותקציב. כל השאר עלינו: מיתוג, ספקים, השקה, תקשורת, הזמנות, ושירות לעובדים עם מענה עד סוף יום העסקים.",
    featured: true,
  },
  { q: "תוך כמה זמן עולים לאוויר?", a: "14 עד 21 יום מרגע ההחלטה.", featured: true },
  {
    q: "לאילו ארגונים זה מתאים?",
    a: "לארגונים, לוועדים, לאיגודים ולמועדוני לקוחות. יותר מ־300 ארגונים עובדים איתנו, מעשרות עובדים ועד עשרות אלפים.",
    featured: true,
  },
  {
    q: "מה boombuy מפעילה עבורנו?",
    a: "אנחנו מקימים ומפעילים את מועדון ההטבות של הארגון, במותג שלכם: האתר, ההטבות, הספקים, ההשקה והשירות לעובדים.",
    featured: false,
  },
  { q: "איך מתחילים?", a: "משאירים פרטים בבדיקת ההתאמה, בוחרים יום ושעה, ומדברים איתנו 15 דקות.", featured: false },
  {
    q: "מה זו ההטבה היומית?",
    a: "כל בוקר העובדים מקבלים הטבה חדשה על מוצר. מצאו את המוצר זול יותר באותו יום? מקבלים את ההפרש בנקודות.",
    featured: false,
  },
  { q: "המועדון יהיה בשם שלנו?", a: "כן. אתר ממותג בשם הארגון, עם הלוגו שלכם.", featured: false },
  { q: "מי נותן שירות לעובדים?", a: "אנחנו. העובדים פונים אלינו ומקבלים מענה עד סוף יום העסקים.", featured: false },
  {
    q: "מה אם העובדים לא ישתמשו?",
    a: "בעשרת הארגונים האחרונים שהשקנו, 8 מתוך 10 עובדים הצטרפו תוך שבועות, ו־60% קונים שוב.",
    featured: false,
  },
  {
    q: "גם איגודים ועמותות יכולים?",
    a: "כן. לאיגודים יש מודל שותפות: מועדון בשם האיגוד, ומקור הכנסה מהרכישות של החברים.",
    featured: false,
  },
  { q: "מה קורה עם הנתונים של העובדים?", a: "הנתונים משותפים לארגון ול־boombuy, ונמחקים בסיום ההתקשרות.", featured: false },
];