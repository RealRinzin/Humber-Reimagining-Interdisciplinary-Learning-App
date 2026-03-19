'use client';

import '@videojs/react/video/skin.css';
import { createPlayer } from '@videojs/react';

// import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';

import {
  VideoSkin,
  Video,
  PlayButton,
  SeekBar,
  MuteButton,
  VolumeSlider,
  FullscreenButton,
  PlaybackRateMenu,
  TextTrackButton,
  PictureInPicture,
  CurrentTimeDisplay,
  DurationDisplay,
} from '@videojs/react/video';
import { notFound } from 'next/navigation';

interface InteractionPayload {
  type: string,
  sec: string
}

// const Player = createPlayer({ features: videoFeatures });
const Player = createPlayer({
  features: [
    PlayButton,
    SeekBar,
    MuteButton,
    VolumeSlider,
    FullscreenButton,
    PlaybackRateMenu,   // speed control
    TextTrackButton,    // CC button
    PictureInPicture,   // PiP mode
    CurrentTimeDisplay,
    DurationDisplay,
  ]
});

interface MyPlayerProps {
  src: string;
  last_stop: number,
  onPlay?: () => void;
  onPause?: () => void;
  onVolumeChange?: () => void;
}
async function postInteraction({ type, sec }: InteractionPayload) {
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
            postInteraction({ type: "Played", sec: '2' });
          }}

          onPause={(e) => {
            const video = e.target as HTMLVideoElement;
            console.log("Paused at:", video.currentTime);
            postInteraction({ type: "Paused", sec: '10' })

          }}

          onVolumeChange={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            console.log("Volume:", video.volume);       // 0.0 to 1.0
            console.log("Muted:", video.muted);
            postInteraction({ type: "Volume", sec: '10' })

            // true / false
          }}>
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