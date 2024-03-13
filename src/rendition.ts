import { generateHash } from "./helpers/generate-hash";
import { QueueManager } from "./queue-manager";
import { JobSettings } from "./types/job-settings";
import { JobStatus } from "./types/job-status";
import { Video } from "./video";

export class Rendition {
  public id: string;
  public status: JobStatus = "READY";
  public name: string;
  private queueManager = QueueManager.getInstance();

  public log(message: string): void {
    this.queueManager.addToLog({
      videoId: this.video.id,
      renditionId: this.id,
      overallStatus: this.video.status,
      renditionStatus: this.status,
      timestamp: Date.now(),
      message,
    });
  }

  constructor(
    private readonly video: Video,
    private readonly settings: JobSettings
  ) {
    this.name = `${settings.width}x${settings.height}@${settings.bitrate}`;
    // Generate a unique hash for this job
    this.id = generateHash(
      video.inputPath + this.name + Math.random() + Date.now().toString()
    );
  }

  public async transcode() {
    this.status = "TRANSCODING";
    this.log("Transcoding started");
    // ... transcoding logic goes here
    setTimeout(() => {
      // Fail 5% of the time
      if (Math.random() < 0.05) {
        this.status = "ERROR";
        this.log("Transcoding failed");
      } else {
        this.status = "COMPLETE";
        this.log("Transcoding complete");
      }
    }, 1000);
  }
}
