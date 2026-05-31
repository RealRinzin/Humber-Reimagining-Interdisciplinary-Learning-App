"use client";
import "@videojs/react/video/skin.css";
import { createPlayer } from "@videojs/react";
import { useRef, useEffect } from "react"; // ← ADD THIS
import { getBrowser, getDevice, getOS, getUserAgent } from "@/utils/UserAgents";
import { VideoSkin, Video, videoFeatures } from "@videojs/react/video";

interface InteractionPayload {
  type: string;
  sec: number;
  videoID: number;
  userVideoID: number;
}
const Player = createPlayer({ features: videoFeatures });
interface MyPlayerProps {
  src: string;
  last_stop: number;
  videoID: number;
  userVideoID: number;
  subtitle: string;
  onPlay?: () => void;
  onPause?: () => void;
  onVolumeChange?: () => void;
}
let me: any = [];

async function getXsrfToken() {
  const xsrfToken =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] ?? "";
  return decodeURIComponent(xsrfToken);
}

async function postInteraction({
  type,
  sec,
  videoID,
  userVideoID,
}: InteractionPayload) {
  const xsrfToken = await getXsrfToken();
  try {
    const currentUser = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/me`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
      },
    );
    const user = await currentUser.json();
    me = user;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-video-analytics/users/${me.id}/userVideoAnalytics`,
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

  if (type === "Paused") {
    const userVideo = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-videos/users/${me.id}/videos`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken,
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-videos/users/${me.id}/videos`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
        body: JSON.stringify({
          video_id: videoID,
          last_paused: sec,
          completed: true,
        }),
      },
    );
  }
}

export const MyPlayer = ({
  src,
  last_stop,
  videoID,
  subtitle,
  userVideoID,
}: MyPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null); // ← ADD THIS
  const hasSeeked = useRef(false);                 // ← ADD THIS

  // ← ADD THIS BLOCK
  useEffect(() => {
    const video = videoRef.current;
    if (!video || last_stop <= 0) return;

    hasSeeked.current = false;

    const attemptSeek = () => {
      if (hasSeeked.current) return;
      if (
        video.seekable.length > 0 &&
        video.seekable.end(0) >= last_stop &&
        video.readyState >= 2
      ) {
        video.currentTime = last_stop;
        hasSeeked.current = true;
      }
    };

    const onTimeUpdate = () => {
      if (!hasSeeked.current) attemptSeek();
    };

    video.addEventListener("canplay", attemptSeek);
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("canplay", attemptSeek);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [last_stop, src]);

  return (
    <Player.Provider>
      <VideoSkin>
        {last_stop}
        <Video
          ref={videoRef} // ← ADD THIS
          src={`/videos/${src}`}
          playsInline
          onCanPlay={(e) => {
            const video = e.target as HTMLVideoElement;
            if (
              last_stop > 0 &&
              Math.abs(video.currentTime - last_stop) > 0.5
            ) {
              video.currentTime = last_stop;
            }
          }}
          onPlay={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Played",
              sec: Math.floor(video.currentTime),
              videoID: videoID,
              userVideoID: userVideoID,
            });
          }}
          onPause={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Paused",
              sec: Math.floor(video.currentTime),
              videoID: videoID,
              userVideoID: userVideoID,
            });
          }}
          onVolumeChange={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            postInteraction({
              type: "Volume",
              sec: Math.floor(video.currentTime),
              videoID: videoID,
              userVideoID: userVideoID,
            });
          }}
          onSeeked={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Seeked",
              sec: Math.floor(video.currentTime),
              videoID: videoID,
              userVideoID: userVideoID,
            });
          }}
          onEnded={(e) => {
            const video = e.target as HTMLVideoElement;
            postInteraction({
              type: "Completed",
              sec: Math.floor(video.duration),
              videoID: videoID,
              userVideoID: userVideoID,
            });
          }}
        >
          <track
            kind="captions"
            label="English"
            srcLang="en"
            src={`/subtitles/${subtitle}`}
            default
          />
        </Video>
      </VideoSkin>
    </Player.Provider>
  );
};