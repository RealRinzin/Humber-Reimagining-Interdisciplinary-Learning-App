'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Type fixes
type VideoJsPlayer = ReturnType<typeof videojs>;
type VideoJsPlayerOptions = Parameters<typeof videojs>[1];
type VideoJsPlayerTrackOptions = any; // define if you need

interface VideoPlayerProps {
  options?: VideoJsPlayerOptions;
  tracks?: VideoJsPlayerTrackOptions[];
  videoLink?: string
  last_watch?: string
}

export default function VideoPlayer({ options, tracks, videoLink, last_watch }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    console.log('loadded')
    console.log('last_watch received:', last_watch);

    if (!videoRef.current || playerRef.current) return;

    // Initialize player
    const player = videojs(videoRef.current, options ?? {
      controls: true,
      fluid: true,
      responsive: true,
      height: 'auto',
      sources: [{ src: videoLink, type: 'video/mp4' }],
    });
    playerRef.current = player;
    // player.currentTime(120);
    // Add tracks if provided
    if (tracks?.length) {
      tracks.forEach(track => player.addRemoteTextTrack(track, false));
    }

    // Example events
    const logEvents = [
      'play', 'pause', 'ended', 'seeking', 'timeupdate',
      'loadedmetadata', 'loadeddata', 'durationchange', 'volumechange',
      'fullscreenchange', 'click', 'dblclick', 'useractive', 'userinactive',
      'dispose', 'ready'
    ] as const;

    logEvents.forEach(event => {
      player.on(event, () => console.log(`Event: ${event}`, event === 'timeupdate' ? player.currentTime() : ''));
    });
    return () => {
      player.dispose();
      playerRef.current = null;
    };
  }, [videoLink,options, tracks, last_watch]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}