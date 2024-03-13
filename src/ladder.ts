export const encodingLadder = {
  high: [
    {
      width: 1920,
      height: 1080,
      bitrate: 8000,
    },
    {
      width: 1280,
      height: 720,
      bitrate: 5000,
    },
  ],
  medium: [
    {
      width: 1280,
      height: 720,
      bitrate: 5000,
    },
    {
      width: 960,
      height: 540,
      bitrate: 3500,
    },
  ],
  low: [
    {
      width: 960,
      height: 540,
      bitrate: 3500,
    },
    {
      width: 640,
      height: 360,
      bitrate: 1500,
    },
  ],
};

export type Quality = keyof typeof encodingLadder;
