"use client";
import "@videojs/react/video/skin.css";
import { createPlayer } from "@videojs/react";
import { getBrowser,getDevice,getOS,getUserAgent } from "@/utils/UserAgents";
import { VideoSkin, Video, videoFeatures } from "@videojs/react/video";
interface InteractionPayload {
  type: string;
  sec: number;
  videoID: number;
  userVideoID:number;
}
const Player = createPlayer({ features: videoFeatures });
interface MyPlayerProps {
  src: string;
  last_stop: number;
  videoID: number;
userVideoID:number,
  onPlay?: () => void;
  onPause?: () => void;
  onVolumeChange?: () => void;
}
let me: any = [];

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
// Interaction
async function postInteraction({ type, sec, videoID,userVideoID }: InteractionPayload) {
  // read XSRF token from cookie
  const xsrfToken = await getXsrfToken();
  try {
    const currentUser = await fetch(`${process.env.API_BASE_URL}/me`, {
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
      `${process.env.API_BASE_URL}/user-video-analytics/users/${me.id}/userVideoAnalytics`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken, 
        },
        body: JSON.stringify({
          user_video_id: userVideoID,
          interaction_type: type,
          interact_at: sec,
          device_type: getDevice(),
          os_type: getOS(),
          ip_address: "23213",
          user_agent: getUserAgent(),
          browser_type: getBrowser(),
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
      `${process.env.API_BASE_URL}/user-videos/users/${me.id}/videos`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken, // ✅ add this
        },
        body: JSON.stringify({
          video_id: videoID,
          last_paused: sec,
          completed: false,
        }),
      },
    );
  }
  if (type === "Completed") {
    const userVideo = await fetch(
      `${process.env.API_BASE_URL}/user-videos/users/${me.id}/videos`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken, // ✅ add this
        },
        body: JSON.stringify({
          video_id: videoID,
          last_paused: sec,
          completed: true,
        }),
      },
    );
    console.log(await userVideo.json());
  }
}
// Export
export const MyPlayer = ({ src, last_stop, videoID,userVideoID }: MyPlayerProps) => {
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
              videoID: videoID,
              userVideoID:userVideoID
            });
          }}
          onPause={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Paused",
              sec: Math.floor(video.currentTime),
              videoID: videoID,
              userVideoID:userVideoID

            });
          }}
          onVolumeChange={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            postInteraction({
              type: "Volume",
              sec: Math.floor(video.currentTime),
              videoID: videoID,
              userVideoID:userVideoID

            });
          }}
          onSeeked={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Seeked",
              sec: Math.floor(video.currentTime),
              videoID: videoID,
              userVideoID:userVideoID

            });
          }}
          // ✅ Video finished
          onEnded={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Completed",
              sec: Math.floor(video.duration),
              videoID: videoID,
              userVideoID:userVideoID
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
