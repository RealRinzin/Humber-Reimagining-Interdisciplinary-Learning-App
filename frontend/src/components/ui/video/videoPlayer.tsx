'use client';

import '@videojs/react/video/skin.css';
import { createPlayer } from '@videojs/react';
import { VideoSkin, Video,videoFeatures } from '@videojs/react/video';

import { useState } from 'react';

const Player = createPlayer({ features: videoFeatures });
interface MyPlayerProps {
  src: string;
  last_stop: number
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
        />
      </VideoSkin>
    </Player.Provider>
  );
};