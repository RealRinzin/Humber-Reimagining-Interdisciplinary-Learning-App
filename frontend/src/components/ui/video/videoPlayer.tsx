'use client';

import '@videojs/react/video/skin.css';
import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import { useEffect } from 'react';

const Player = createPlayer({ features: videoFeatures });
interface MyPlayerProps {
  src: string;
  last_stop: number,
  onPlay?: () => void;
  onPause?: () => void;
  onVolumeChange?: () => void;
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
          }}

          onPause={(e) => {
            const video = e.target as HTMLVideoElement;
            console.log("Paused at:", video.currentTime);

          }}

          onVolumeChange={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            console.log("Volume:", video.volume);       // 0.0 to 1.0
            console.log("Muted:", video.muted);         // true / false
          }}

        />
      </VideoSkin>
    </Player.Provider>
  );
};