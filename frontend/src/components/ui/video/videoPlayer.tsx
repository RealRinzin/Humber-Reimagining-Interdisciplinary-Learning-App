"use client";
import "@videojs/react/video/skin.css";
import { createPlayer } from "@videojs/react";

import { VideoSkin, Video, videoFeatures } from "@videojs/react/video";
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

// ASYNC
async function getXsrfToken() {
  // read XSRF token from cookie
  const xsrfToken =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] ?? "";

  // const decodedXsrf = decodeURIComponent(xsrfToken);
  return decodeURIComponent(xsrfToken);
}
let me:any = [];
// Interaction
async function postInteraction({ type, sec }: InteractionPayload) {
  // read XSRF token from cookie
  const xsrfToken = await getXsrfToken();
  try {
    const currentUser = await fetch("http://localhost:8000/api/v1/me", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": xsrfToken, // ✅ add this
      },
    });

    // Current User Detail;
    const user = await currentUser.json();
    me = user;
    // Update the interaction
    const res = await fetch(
      `http://localhost:8000/api/v1/user-video-analytics/users/${user.id}/userVideoAnalytics/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken, // ✅ add this
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

  // Only react or update
  if (type === "Paused") {
    const userVideo = await fetch(
      `http://localhost:8000/api/v1/user-videos/users/${me.id}/videos`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken, // ✅ add this
        },
        body: JSON.stringify({
          video_id: 1,
          last_paused: sec,
          completed: false,
        }),
      },
    );
  }
  if (type === "Completed") {
    const userVideo = await fetch(
      `http://localhost:8000/api/v1/user-videos/users/${me.id}/videos`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken, // ✅ add this
        },
        body: JSON.stringify({
          video_id: 1,
          last_paused: sec,
          completed: true,
        }),
      },
    );
    console.log(await userVideo.json());
  }
}
// Export
export const MyPlayer = ({ src, last_stop }: MyPlayerProps) => {
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
          onPlay={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Played",
              sec: Math.floor(video.currentTime),
            });
          }}
          onPause={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Paused",
              sec: Math.floor(video.currentTime),
            });
          }}
          onVolumeChange={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            postInteraction({
              type: "Volume",
              sec: Math.floor(video.currentTime),
            });
          }}
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
