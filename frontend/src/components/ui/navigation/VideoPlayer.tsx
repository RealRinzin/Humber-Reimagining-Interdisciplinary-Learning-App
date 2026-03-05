'use client';

import { useRef, useEffect } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions, VideoJsPlayerTrackOptions } from 'video.js';

interface VideoPlayerProps {
  options: VideoJsPlayerOptions;
  tracks?: VideoJsPlayerTrackOptions[];
}

export default function VideoPlayer({ options, tracks }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);
  useEffect(() => {
    const ua = navigator.userAgent;
    console.log('User Agent:', ua);
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      console.log('Is Mobile:', isMobile);
    if (!playerRef.current && videoRef.current) {
      // Initialize the Video.js player
      const player = (playerRef.current = videojs(videoRef.current, options));
      // 🔹 ------------------------------BASIC ANALYTICS EVENTS------------------------------
      // Play event is triggered when the video starts playing, either by user interaction or programmatically.
      player.on('play', () => { //
        console.log('▶️ Play');
      });
      // Pause event is triggered when the video is paused, either by user interaction or programmatically.
      player.on('pause', () => {
        console.log('⏸ Pause at', player.currentTime());
      });
      // end event is triggered when the video playback reaches the end of the media.
      player.on('ended', () => {
        console.log('✅ Video ended');
      });
      // seeking event is triggered when the user seeks to a different time in the video, either by dragging the progress bar or programmatically.
      player.on('seeking', () => {
        console.log('⏩ Seeking to', player.currentTime());
      });
      // timeupdate event is triggered periodically as the video plays, providing updates on the current playback time. This is useful for tracking how much of the video has been watched.
      player.on('timeupdate', () => {
        console.log('⏱ Current time', player.currentTime());
      });

      // loadedmetadata event is triggered when the metadata of the video (such as duration and dimensions) has been loaded. This is useful for getting information about the video before it starts playing.
      player.on('loadedmetadata', () => {
        console.log('📐 Video dimensions', player.videoWidth(), 'x', player.videoHeight());
      });
      // loadeddata event is triggered when the first frame of the video has been loaded and is ready to play. This indicates that the video is ready for playback.
      player.on('loadeddata', () => {
        console.log('📥 Video loaded and ready to play');
      });
      // durationchange event is triggered when the duration of the video changes, which can happen when the video is loaded or if the source is changed. This is useful for tracking the total length of the video.
      player.on('durationchange', () => {
        console.log('⏳ Video duration', player.duration(), 'seconds');
      });
      // volumechange event is triggered when the volume of the video changes, either by user interaction or programmatically. This is useful for tracking user preferences and interactions with the video player.
      player.on('volumechange', () => {
        console.log('🔊 Volume changed to', player.volume());
      });
      // textTracks change event is triggered when the user changes the subtitle track, either by selecting a different track or turning subtitles on/off. This is useful for tracking user interactions with subtitles and accessibility features.
      player.textTracks().on('change', () => {
        const tracks = player.textTracks();
        for (let i = 0; i < tracks.length; i++) {
          if (tracks[i].mode === 'showing') {
            console.log('📝 Subtitle ON:', tracks[i].label);
          }
        }
      });
      // fullscreenchange event is triggered when the user enters or exits fullscreen mode. This is useful for tracking how users are viewing the video and optimizing the experience for different screen sizes.
      player.on('fullscreenchange', () => {
        console.log('🖥 Fullscreen:', player.isFullscreen());
      });
      // click and dblclick events are triggered when the user clicks or double-clicks on the video player. This is useful for tracking user interactions and can be used to implement custom behaviors, such as toggling fullscreen on double-click.
      player.on('click', () => {
        console.log('🖱 Clicked on player');
      });
      // dblclick is triggered when the user double-clicks on the video player. This can be used to toggle fullscreen mode or implement other custom behaviors based on user interaction.
      player.on('dblclick', () => {
        console.log('🖱 Double-clicked on player');
      });
      // useractive event is triggered when the user interacts with the video player, such as moving the mouse or pressing a key. This can be used to show controls or implement other behaviors based on user activity. Conversely, userinactive is triggered when there has been no user interaction for a certain period of time, which can be used to hide controls or implement other behaviors based on inactivity.
      player.on('useractive', () => {
        console.log('👤 User is active');
      });
      // userinactive event is triggered when there has been no user interaction with the video player for a certain period of time. This can be used to hide controls or implement other behaviors based on user inactivity, such as pausing the video or showing a screensaver.
      player.on('userinactive', () => {
        console.log('👤 User is inactive');
      });
      // dispose event is triggered when the video player is disposed, either by calling the dispose method programmatically or when the component unmounts. This is useful for cleaning up resources and ensuring that any necessary cleanup logic is executed when the player is no longer needed.
      player.on('dispose', () => {
        console.log('🗑 Player disposed');
      });
      //  ready event is triggered when the video player is fully initialized and ready to be interacted with. This is a good place to perform any additional setup or configuration that depends on the player being ready, such as adding custom controls or loading additional resources.
      player.on('ready', () => {
        console.log('✅ Player is ready');
      });
      // 🔹 ------------------------------BASIC ANALYTICS EVENTS------------------------------
      // SUBTITLE TRACKS
      if (tracks) {
        tracks.forEach((track) => {
          player.addRemoteTextTrack(track, true); // ✅ true ensures it shows in control bar
        });
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, tracks]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" controls>
        {tracks?.map((track, index) => (
          <track
            key={index}
            kind={track.kind}
            src={track.src}
            srcLang={track.srclang}
            label={track.label}
            default={track.default}
          />
        ))}
      </video>
    </div>
  );
}