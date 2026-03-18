export default function DeviceType(){
const userAgent = navigator.userAgent;
    // ✅ Better browser detection
    const getBrowser = () => {
      if (userAgent.includes("Edg")) return "Edge";         // Edge before Chrome check
      if (userAgent.includes("OPR")) return "Opera";        // Opera before Chrome check
      if (userAgent.includes("Chrome")) return "Chrome";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Safari")) return "Safari";
      return "Unknown";
    };

    // ✅ Better OS detection
    const getOS = () => {
      if (userAgent.includes("Windows NT")) return "Windows";
      if (userAgent.includes("Mac OS X")) return "macOS";
      if (userAgent.includes("Android")) return "Android";
      if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
      if (userAgent.includes("Linux")) return "Linux";
      return "Unknown";
    };

    // ✅ Better device detection (order matters!)
    const getDevice = () => {
      if (userAgent.includes("iPhone")) return "Mobile";
      if (userAgent.includes("Android") && userAgent.includes("Mobile")) return "Mobile";
      if (userAgent.includes("iPad") || userAgent.includes("Android")) return "Tablet";
      return "Desktop";
    };

    alert(getBrowser())
    alert(getOS())
    alert(getDevice())
    console.log("Browser:", getBrowser());  // Chrome
    console.log("OS:", getOS());            // macOS
    console.log("Device:", getDevice());    // Desktop

}