import { fitImg } from "@/lib/img";

// These descriptors match the ACTUAL encoded pixel widths returned by the CDN.
export const HERO_SIZES = "(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 64px), 1036px";
export const heroSrc = (url) => fitImg(url, 1024, 576, 76);
export const heroSrcSet = (url) => [480, 768, 1024, 1280, 1600]
  .map((w) => `${fitImg(url, w, w * 9 / 16, 76)} ${w}w`).join(", ");

// Offers contain small lettering: keep quality high and never crop the source.
// Width-only fits give exact descriptors for the smaller variants. All nine
// existing full-size responses were measured at 623×780; retain those exact URLs
// as the high-density branch instead of upscaling and increasing their payload.
export const offerSrc = (url) => fitImg(url, 480, 1600, 84);
export const offerSrcSet = (url) => [
  ...[320, 480].map((w) => `${fitImg(url, w, 1600, 84)} ${w}w`),
  `${fitImg(url, 640, 780, 82)} 623w`,
].join(", ");