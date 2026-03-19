'use client';

import '@videojs/react/video/skin.css';
import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import { useEffect } from 'react';
import { notFound } from 'next/navigation';

interface InteractionPayload {
  type:string,
  sec:string
}

const Player = createPlayer({ features: videoFeatures });
interface MyPlayerProps {
  src: string;
  last_stop: number,
  onPlay?: () => void;
  onPause?: () => void;
  onVolumeChange?: () => void;
}
async function postInteraction({type,sec}:InteractionPayload) {
  try {
    const res = await fetch("http://localhost:8000/api/v1/user_video_analytic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 1|BMECIpZdLlTJmnWsbEzvSIal8S8VOunBwLaBhrEg82a48e7e`, // ⚠️ temporary only
      },
      body: JSON.stringify({
        user_video_id: 3,
        interaction_type: type,
        // interact_at: Math.floor(3.4),
        interact_at: sec,
        device_type: "phone",
        os_type: "android",
        browser_type: "chrome",
        played_on: new Date().toISOString().split("T")[0],
      }),
    });

    const data = await res.json();
    console.log("API response:", data);

  } catch (err) {
    console.error("API error:", err);
  }
}
export const MyPlayer = ({ src, last_stop }: MyPlayerProps) => {
  // useEffect(() => {

  //   const userAgent = navigator.userAgent;

  //   // ✅ Better browser detection
  //   const getBrowser = () => {
  //     if (userAgent.includes("Edg")) return "Edge";         // Edge before Chrome check
  //     if (userAgent.includes("OPR")) return "Opera";        // Opera before Chrome check
  //     if (userAgent.includes("Chrome")) return "Chrome";
  //     if (userAgent.includes("Firefox")) return "Firefox";
  //     if (userAgent.includes("Safari")) return "Safari";
  //     return "Unknown";
  //   };

  //   // ✅ Better OS detection
  //   const getOS = () => {
  //     if (userAgent.includes("Windows NT")) return "Windows";
  //     if (userAgent.includes("Mac OS X")) return "macOS";
  //     if (userAgent.includes("Android")) return "Android";
  //     if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  //     if (userAgent.includes("Linux")) return "Linux";
  //     return "Unknown";
  //   };

  //   // ✅ Better device detection (order matters!)
  //   const getDevice = () => {
  //     if (userAgent.includes("iPhone")) return "Mobile";
  //     if (userAgent.includes("Android") && userAgent.includes("Mobile")) return "Mobile";
  //     if (userAgent.includes("iPad") || userAgent.includes("Android")) return "Tablet";
  //     return "Desktop";
  //   };

  //   alert(getBrowser())
  //   alert(getOS())
  //   alert(getDevice())
  //   console.log("Browser:", getBrowser());  // Chrome
  //   console.log("OS:", getOS());            // macOS
  //   console.log("Device:", getDevice());    // Desktop
  // }, []);
  return (
    <Player.Provider>
      <VideoSkin>
        {/* <Video src={`${src}#t=${last_stop}`} playsInline /> */}
        <Video
          src={src}
          playsInline
          onLoadedMetadata={(e) => {
            const video = e.target as HTMLVideoElement;
            if (last_stop > 0) {
              video.currentTime = last_stop;
            }
          }}
          // ✅ Play event
          onPlay={(e) => {
            const video = e.target as HTMLVideoElement;
            console.log("Playing at:", video.currentTime);
            postInteraction({type:"Played",sec:'2'});
          }}

          onPause={(e) => {
            const video = e.target as HTMLVideoElement;
            console.log("Paused at:", video.currentTime);
            postInteraction({type:"Paused",sec:'10'})

          }}

          onVolumeChange={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            console.log("Volume:", video.volume);       // 0.0 to 1.0
            console.log("Muted:", video.muted);   
            postInteraction({type:"Volume",sec:'10'})

                  // true / false
          }}

        />
      </VideoSkin>
    </Player.Provider>
  );
};