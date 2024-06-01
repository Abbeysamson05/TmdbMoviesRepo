// timeUtils.js
export function formatRuntime(runtimeInMinutes) {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  const seconds = 0;

  const pad = (num) => num.toString().padStart(2, "0");

  return `${pad(hours)}h:${pad(minutes)}min:${pad(seconds)}sec`;
}
