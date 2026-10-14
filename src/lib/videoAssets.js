// Central registry of the onepager's video assets.
// Videos are served from the Base44 CDN; this file is the single source of
// truth so component files don't scatter raw URLs. Update here, not in JSX.
// `poster` is the opening still shown before the first playable frame.

export const VIDEO_ASSETS = {
  hrTransformation: {
    name: "boombuy-hr-transformation.mp4",
    src: "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/afda5f493_boombuy-hero-transformation-CARDS-FIXED.mp4",
    usage: "HeroTransformation — מנהלת הרווחה (before → after)",
    bytes: 3700402,
    sha256: "4f60eeb4e9bac74d59adbdb669a03fefc92b887cc653574d4c6bf38bae7f8d07",
    contentType: "video/mp4",
    poster: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/51841ddbd_1.png",
  },
  employeeExperiences: {
    name: "boombuy-employee-experiences.mp4",
    src: "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/3dae91cde_gemini_generated_video_74de224c.mp4",
    usage: "ExperienceFilm — חוויות עובדים (כדורגל, הופעות, ספא, חופשות)",
    bytes: 5269656,
    sha256: "33bf8df0e9eeb1c031958e611e42bc7b1c0e24e23224b4be88dd3da1063e7467",
    contentType: "video/mp4",
    poster: null, // TODO: capture a first-frame still and upload; null = no poster yet
  },
};

export const HR_VIDEO = VIDEO_ASSETS.hrTransformation;
export const EXPERIENCES_VIDEO = VIDEO_ASSETS.employeeExperiences;