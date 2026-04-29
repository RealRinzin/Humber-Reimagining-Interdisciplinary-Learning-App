"use client";

import "@videojs/react/video/skin.css";
import { createPlayer } from "@videojs/react";

import { VideoSkin, Video, videoFeatures } from "@videojs/react/video";
// import { useEffect, useRef } from 'react';
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/fetch";
import { useEffect, useState } from "react";

interface InteractionPayload {
  type: string;
  sec: number;
}

const Player = createPlayer({ features: videoFeatures });
interface MyPlayerProps {
  src: string;
  last_stop: number;
  onPlay?: () => void;
  onPause?: () => void;
  onVolumeChange?: () => void;
}
async function postInteraction({ type, sec }: InteractionPayload) {
  // read XSRF token from cookie
  const xsrfToken =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] ?? "";

  const decodedXsrf = decodeURIComponent(xsrfToken);
  try {
    const res = await fetch(
      `http://localhost:8000/api/v1/user-video-analytics/users/4/userVideoAnalytics/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodedXsrf, // ✅ add this
        },
        body: JSON.stringify({
          user_video_id: 3,
          interaction_type: type,
          interact_at: sec,
          device_type: "phone",
          os_type: "android",
          ip_address: "23213",
          user_agent: "useragent",
          browser_type: "chrome",
          played_on: new Date().toISOString().split("T")[0],
        }),
      },
    );

    const data = await res.json();
    
  } catch (err) {
    console.error("API error:", err);
  }
}

// Video

// Export
export const MyPlayer = ({ src, last_stop }: MyPlayerProps) => {
  const [data,setData] = useState();
  useEffect(() => {
    fetch("http://localhost:8000/api/v1//user-videos/users/4/videos/3", {
      credentials: "include", // browser handles cookies + referer automatically
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
    }, []);
    console.log(data)
    return (
    <Player.Provider>
      <VideoSkin>
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
            // console.log("Playing at:", video.currentTime);
            postInteraction({
              type: "Played",
              sec: Math.floor(video.currentTime),
            });
          }}
          onPause={(e) => {
            const video = e.target as HTMLVideoElement;
            // console.log("Paused at:", video.currentTime);
            postInteraction({
              type: "Paused",
              sec: Math.floor(video.currentTime),
            });
          }}
          onVolumeChange={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            // console.log("Volume:", video.volume); // 0.0 to 1.0
            // console.log("Muted:", video.muted);
            postInteraction({
              type: "Volume",
              sec: Math.floor(video.currentTime),
            });

            // true / false
          }}
          // ✅ Track progress every second
          // onTimeUpdate={(e) => {
          //   const video = e.target as HTMLVideoElement;
          //   const current = Math.floor(video.currentTime);
          //   // throttle — only post every 5 seconds to avoid spamming your Laravel API
          //   if (current % 5 === 0) {
          //     postInteraction({ type: "Progress", sec: current });
          //   }
          // }}
          // ✅ User scrubbed to a different position
          onSeeked={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Seeked",
              sec: Math.floor(video.currentTime),
            });
          }}
          // ✅ Video finished
          onEnded={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Completed",
              sec: Math.floor(video.duration),
            });
          }}
          // ✅ Buffering / stalled
          // onWaiting={(e) => {
          //   const video = e.target as HTMLVideoElement;
          //   postInteraction({
          //     type: "Buffering",
          //     sec: Math.floor(video.currentTime),
          //   });
          // }}
          // ✅ Playback rate changed (0.5x, 1x, 1.5x, 2x)
          // onRateChange={(e) => {
          //   const video = e.target as HTMLVideoElement;
          //   postInteraction({
          //     type: "RateChange",
          //     sec: Math.floor(video.currentTime),
          //   });
          // }}
        >
          {/* Closed Captions */}
          <track
            kind="captions"
            label="English"
            srcLang="en"
            src="http://localhost:3000/subtitles/caption.vtt"
            default
          />
        </Video>
      </VideoSkin>
    </Player.Provider>
  );
};
