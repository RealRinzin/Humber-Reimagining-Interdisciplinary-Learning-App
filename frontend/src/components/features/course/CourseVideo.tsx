'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const player = videojs(videoRef.current, {
            controls: true,
            fluid:true,
            responsive:true,
            height: 'auto',
            sources: [{ src: 'https://loremipsum.video/vt/powerpoint-3.mp4', type: 'video/mp4' }],
        });

        return () => {
            player.dispose();
        };
    }, []);

    return (
        <video ref={videoRef} className="video-js" />
    );
}