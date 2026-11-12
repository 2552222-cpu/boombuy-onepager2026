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
    src: "https://media.base44.com/videos/public/69e48538aaee477b09fc7b49/8afe405af_boombuy-experiences-goal-fixed.mp4",
    usage: "ExperienceFilm — חוויות עובדים (כדורגל, הופעות, ספא, חופשות)",
    bytes: 6609466,
    sha256: "1eeb61a670e388007a4151f8bc272aa5309c8e8d1ab67dea9722fd8137c4d486",
    contentType: "video/mp4",
    poster: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/81c1955c3_boombuy-experiences-goal-poster.jpg",
  },
};

export const HR_VIDEO = VIDEO_ASSETS.hrTransformation;
export const EXPERIENCES_VIDEO = VIDEO_ASSETS.employeeExperiences;