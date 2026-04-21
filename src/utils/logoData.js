// כל הלוגואים שמורים במקום אחד עם שמות
// לוגו 3 = תעש (index 2), לוגו 25 = Check Point (index 24)
export const logoList = [
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/2f10b2609_17.png", name: "לאומי" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/f26a5145d_-2026-02-18T184914549.png", name: "ישראייר" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/8003c0d5a_62.png", name: "תעש" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/dff369112_61.png", name: "קרן קיימת" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/a6011911e_42.png", name: "Estee Lauder" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6ecb1d12e_48.png", name: "ORT" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/da1504162_47.png", name: "בזן" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/0d5a77386_2.png", name: "אלבר" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/62d86b046_8.png", name: "בנק ישראל" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ad90fe974_-2026-03-22T223323805.png", name: "ZIM" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/f5d33c4f1_-2026-03-23T144912129.png", name: "סלקום" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3f66c2722_37.png", name: "מזרחי טפחות" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/440e21638_readytoboom93.png", name: "Teva" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1a493167d_27.png", name: "ONE" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d27a9085c_26.png", name: "רשות המסים" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/c078c3ee8_25.png", name: "SAP" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/eb5f80934_24.png", name: "מגן דוד אדום" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/bbde088d4_23.png", name: "מילגם" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/076c5871f_22.png", name: "AMOT" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/e6509fd0a_32.png", name: "MAX" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ee4dfeabe_-2026-03-22T223003872.png", name: "אלקטרה אפיקים" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6862cd610_-2026-03-22T184752919.png", name: "דופלט" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/62fa4ae8e_-2026-03-22T184709815.png", name: "בנק לאומי" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/be9e3de1a_-2026-03-22T184841801.png", name: "דלק" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/ee6b05338_-2026-04-03T180125393.png", name: "רמלאל" },
  { url: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/5f7a627b6_-2026-04-06T212635319.png", name: "HOT mobile" },
];

export const allLogos = logoList.map(l => l.url);

// הרשימה הנוכחית (indices 0–29, 30 פריטים):
// 0=לאומי, 1=ישראייר, 2=תעש, 3=קרן קיימת, 4=Estee Lauder, 5=ORT, 6=בזן, 7=אלבר
// 8=בנק ישראל, 9=ZIM, 10=סלקום, 11=מזרחי טפחות, 12=Teva, 13=ONE, 14=רשות המסים
// 15=SAP, 16=מגן דוד אדום, 17=מילגם, 18=AMOT, 19=MAX, 20=אלקטרה אפיקים
// 21=דופלט, 22=בנק לאומי, 23=דלק, 24=רמלאל, 25=HOT mobile (29)
// rowA: 12 פריטים (זוגי)
const rowAIndices = [3, 4, 20, 11, 10, 0, 12, 9, 8, 5, 7, 6];
export const rowA = rowAIndices.map(i => allLogos[i]);

// rowB: 14 פריטים (זוגי)
const rowBIndices = [1, 2, 16, 15, 18, 13, 19, 14, 22, 23, 29, 21, 17, 24];
export const rowB = rowBIndices.map(i => allLogos[i]);