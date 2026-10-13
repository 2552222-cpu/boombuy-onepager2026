// media.base44.com on-the-fly image transforms.
// photo  = fill (crop to exact w×h);  fitImg = fit (preserve aspect ratio within w×h).
export function photo(url, w, h, q = 78) {
  return `${url}/v1/fill/w_${w},h_${h},q_${q}/img.webp`;
}
export function fitImg(url, w, h, q = 82) {
  return `${url}/v1/fit/w_${w},h_${h},q_${q}/img.webp`;
}