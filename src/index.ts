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
    const parts: string[] = [dateFromUnix.toISOString()];
    if (update.videoId)
      parts.push(`Video ${update.videoId} (${update.overallStatus})`);
    if (update.renditionId)
      parts.push(`Rendition ${update.renditionId} (${update.renditionStatus})`);
    console.log(parts.join(" - "), update.message);
  });

  videos.forEach((videoOpts) => {
    jobQueue.addToQueue(videoOpts);
  });
})();
