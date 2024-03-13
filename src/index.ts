import { QueueManager } from "./queue-manager";
import { VideoOpts } from "./types/video-options";

(async () => {
  const videos: VideoOpts[] = [
    {
      inputPath: "/input/video1.mp4",
      outputPath: "/output/video1/",
      quality: "high",
    },
    {
      inputPath: "/input/video2.mp4",
      outputPath: "/output/video2/",
      quality: "medium",
    },
    {
      inputPath: "/input/video3.mp4",
      outputPath: "/output/video3/",
      quality: "low",
    },
  ];

  const jobQueue = QueueManager.getInstance();

  jobQueue.subscribeToLogs((update) => {
    const dateFromUnix = new Date(update.timestamp);
    console.log(
      `${dateFromUnix.toISOString()} - Job ${update.videoId} (${
        update.overallStatus
      }) - Rendition ${update.renditionId} (${update.renditionStatus})`
    );
  });

  videos.forEach((videoOpts) => {
    jobQueue.addToQueue(videoOpts);
  });
})();
