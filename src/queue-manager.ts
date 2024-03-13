import { LogMessage } from "./types/log-message";
import { VideoOpts } from "./types/video-options";
import { Video } from "./video";

export class QueueManager {
  private static _instance: QueueManager | null = null;

  public static getInstance() {
    if (!this._instance) {
      this._instance = new QueueManager();
    }
    return this._instance;
  }

  private constructor() {
    this.start();
  }

  private videos: Video[] = [];

  public readonly log: LogMessage[] = [];
  private logSubscriptions: Array<(update: LogMessage) => void> = [];

  private get isTranscoding() {
    return this.videos.some((video) => video.status === "TRANSCODING");
  }

  private findNextVideo() {
    return this.videos.find((video) => video.status === "READY");
  }

  private start() {
    // Loop with a timeout to check for new videos
    setInterval(() => {
      if (this.isTranscoding) return;
      const video = this.findNextVideo();
      if (video) {
        video.transcode();
      }
    }, 1000);
  }

  public addToQueue(settings: VideoOpts): Video {
    const video = new Video(settings);
    this.videos.push(video);
    this.addToLog({
      videoId: video.id,
      overallStatus: video.status,
      timestamp: Date.now(),
      message: "Added to queue",
    });
    return video;
  }

  public addToLog(update: LogMessage) {
    this.log.push(update);
    this.logSubscriptions.forEach((cb) => cb(update));
  }

  public subscribeToLogs(cb: (update: LogMessage) => void) {
    this.logSubscriptions.push(cb);
  }
}
