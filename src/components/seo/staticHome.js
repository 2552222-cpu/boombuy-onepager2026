// Visible static HTML for ALL visitors, replaced (not duplicated) by React's root.
// This is a build-time fallback, not SSR or a solution to the host's route/status handling.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export default function staticHome({ copy, faq, testimonials, contact, video, organization }) {
  const e = escapeHtml;
  const link = (url, text) => `<a class="underline underline-offset-4" href="${e(url)}">${e(text)}</a>`;
  const section = (id, title, body) => `<section id="${id}" class="py-8"><h2 class="mb-5 text-3xl font-bold">${e(title)}</h2>${body}</section>`;
  return `<header class="mx-auto max-w-7xl px-4 py-4"><img src="${e(organization.logo)}" alt="boombuy" width="360" height="120" class="h-12 w-auto object-contain" /></header>
    <main id="main-content" class="mx-auto max-w-5xl px-4 pb-10 text-foreground">
      <section class="py-8"><h1 class="text-4xl font-extrabold">${e(copy.HOME_HEADING)}</h1><p class="mt-5 text-lg leading-relaxed">${e(copy.PRODUCT_EXPLANATION)}</p></section>
      ${section("offer-paths", "למי זה מתאים?", `<p>${e(copy.TARGET_AUDIENCE)}</p>`)}
      ${section("operation-steps", "איך מתחילים?", `<ol class="list-inside list-decimal space-y-3">${copy.START_STEPS.map((step) => `<li>${e(step.title)} ${e(step.text)}</li>`).join("")}</ol>`)}
      ${section("testimonials", "מה אומרים מי שכבר שדרגו?", testimonials.map((item) => `<figure class="my-6"><blockquote><p>״${e(item.text)}״</p></blockquote><figcaption>${e(item.name)}, ${e(item.role)}</figcaption></figure>`).join(""))}
      ${section("experience-film", "חוויות לעובדים לאורך השנה", `<p class="mb-4">${e(copy.VIDEO_EXPLANATION)}</p><video controls muted playsinline preload="none" width="1600" height="900" class="h-auto w-full" src="${e(video.src)}" aria-label="סרטון דוגמאות לחוויות לעובדים ללא קול"></video>`)}
      ${section("about-contact", "מי עומד מאחורי המועדון?", `<p>${e(copy.ABOUT_TEXT)}</p><p class="mt-5 flex flex-wrap gap-5">${link(contact.companyUrl, "אתר החברה: boombuy.co.il")}${link("tel:" + contact.telephone, contact.phone)}${link("mailto:" + contact.email, contact.email)}</p>`)}
      ${section("faq", "שאלות נפוצות", faq.map((item) => `<section class="my-5"><h3 class="text-xl font-bold">${e(item.q)}</h3><p class="mt-2 leading-relaxed">${e(item.a)}</p></section>`).join(""))}
    </main><footer class="mx-auto flex max-w-5xl flex-wrap gap-6 px-4 py-8">${link("/privacy", "מדיניות פרטיות")}${link("/accessibility", "הצהרת נגישות")}</footer>`;
}