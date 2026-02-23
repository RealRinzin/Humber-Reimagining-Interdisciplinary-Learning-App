console.log("Script loaded");
const player = videojs('my-video');
// Per
// player.ready(() => {
//   player.on('loadedmetadata', () => {
//     player.currentTime(2); // start at 1 minute 30 seconds
//     player.play();
//   });
// });
// ─── PLAYBACK ───────────────────────────────────────────

// Fires when play() is called
player.on('play', () => {
  console.log('Video started playing');
});

// Fires when paused
player.on('pause', () => {
  console.log('Video paused at:', player.currentTime());
});

// Fires when actually playing (after buffering resolves)
player.on('playing', () => {
  console.log('Video is now playing (not buffering)');
});

// Fires when video reaches the end
player.on('ended', () => {
  console.log('Video ended');
  // e.g. show replay button, autoplay next
});

// Fires continuously as time progresses (~4x per second)
player.on('timeupdate', () => {
  console.log('Current time:', player.currentTime());
  console.log('Duration:', player.duration());
  // e.g. update a custom progress bar
});

// Fires when user starts scrubbing
player.on('seeking', () => {
  console.log('User is seeking to:', player.currentTime());
});

// Fires when scrubbing is complete
player.on('seeked', () => {
  console.log('Seeked to:', player.currentTime());
});

// Fires when playback speed changes
player.on('ratechange', () => {
  console.log('Playback rate:', player.playbackRate());
  // e.g. 0.5, 1, 1.5, 2
});


// ─── LOADING & BUFFERING ────────────────────────────────

// Fires when browser starts loading the source
player.on('loadstart', () => {
  console.log('Loading started');
  console.log('Current src:', player.currentSrc()); // video.mp4 or MY_VIDEO.webm
});

// Fires when duration becomes known
player.on('durationchange', () => {
  console.log('Duration is:', player.duration(), 'seconds');
});

// Fires when metadata is ready (duration, dimensions, etc.)
player.on('loadedmetadata', () => {
  console.log('Metadata loaded');
  console.log('Video width:', player.videoWidth());
  console.log('Video height:', player.videoHeight());
  console.log('Duration:', player.duration());
});

// Fires when the first frame is ready
player.on('loadeddata', () => {
  console.log('First frame loaded, poster can be replaced');
});

// Fires as the browser downloads the file
player.on('progress', () => {
  const buffered = player.bufferedPercent();
  console.log('Buffered:', (buffered * 100).toFixed(1) + '%');
});

// Fires when enough data to start playing
player.on('canplay', () => {
  console.log('Can start playing');
});

// Fires when video can play all the way through without buffering
player.on('canplaythrough', () => {
  console.log('Can play through without interruption');
  // Good place to auto-play
});

// Fires when browser stops fetching but expects more data
player.on('stalled', () => {
  console.log('Network stalled — data not arriving');
  // e.g. show a "slow connection" warning
});

// Fires when loading is intentionally paused by the browser
player.on('suspend', () => {
  console.log('Media loading suspended');
});

// Fires when playback stops to buffer
player.on('waiting', () => {
  console.log('Waiting for data to buffer...');
  // e.g. show a custom spinner
});

// Fires when loading is aborted (e.g. user navigates away)
player.on('abort', () => {
  console.log('Media loading aborted');
});

// Fires when src is reset or changed to empty
player.on('emptied', () => {
  console.log('Media source was emptied');
});


// ─── VOLUME ─────────────────────────────────────────────

// Fires when volume or muted changes
player.on('volumechange', () => {
  console.log('Volume:', player.volume());      // 0.0 to 1.0
  console.log('Muted:', player.muted());        // true or false
});


// ─── ERRORS ─────────────────────────────────────────────

// Fires on any load/playback error
player.on('error', () => {
  const error = player.error();
  console.error('Error code:', error.code);
  // Codes:
  // 1 = MEDIA_ERR_ABORTED
  // 2 = MEDIA_ERR_NETWORK
  // 3 = MEDIA_ERR_DECODE
  // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED
});


// ─── VIDEO.JS SPECIFIC ──────────────────────────────────

// Fires when player is fully ready
player.ready(() => {
  console.log('Video.js player is ready');
});

// Fires when player is disposed/destroyed
player.on('dispose', () => {
  console.log('Player was destroyed');
});

// Fires when fullscreen is entered/exited
player.on('fullscreenchange', () => {
  console.log('Is fullscreen:', player.isFullscreen());
});

// Fires when user becomes inactive (mouse stops moving)
player.on('userinactive', () => {
  console.log('User inactive — controls will hide');
});

// Fires when user becomes active again
player.on('useractive', () => {
  console.log('User active — controls visible');
});