const userAgent = () => navigator.userAgent;
// Get all the use Agents
export const getUserAgent = (): string => {
  return userAgent();
}
// Get the browser details
export const getBrowser = (): string => {
  const ua = userAgent();
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("OPR")) return "Opera";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
};
// Get the OS detail
export const getOS = (): string => {
  const ua = userAgent();
  if (ua.includes("Windows NT")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown";
};
// Get the Device types
export const getDevice = (): string => {
  const ua = userAgent();
  if (ua.includes("iPhone")) return "Mobile";
  if (ua.includes("Android") && ua.includes("Mobile")) return "Mobile";
  if (ua.includes("iPad") || ua.includes("Android")) return "Tablet";
  return "Desktop";
};