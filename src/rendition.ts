import { generateHash } from "./helpers/generate-hash";
import { JobSettings } from "./types/job-settings";
import { JobStatus } from "./types/job-status";
import { LogMessage } from "./types/log-message";
import { Video } from "./video";

export class Rendition {
  public id: string;
  public status: JobStatus = "READY";
  public name: string;

  public toLogMessage(): LogMessage {
    return {
      videoId: this.video.id,
      renditionId: this.id,
      overallStatus: this.video.status,
      renditionStatus: this.status,
      timestamp: Date.now(),
    };
  }

  constructor(
    private readonly video: Video,
    private readonly settings: JobSettings
  ) {
    this.name = `${settings.width}x${settings.height}@${settings.bitrate}`;
    // Generate a unique hash for this job
    this.id = generateHash(
      settings.inputPath + this.name + Math.random() + Date.now().toString()
    );
  }

  public async transcode() {
    this.status = "TRANSCODING";
    // ... transcoding logic goes here
    setTimeout(() => {
      // Fail 5% of the time
      if (Math.random() < 0.05) {
        this.status = "ERROR";
      } else {
        this.status = "COMPLETE";
      }
    }, 1000);
  }
}
