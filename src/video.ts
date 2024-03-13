import { generateHash } from "./helpers/generate-hash";
import { encodingLadder } from "./ladder";
import { QueueManager } from "./queue-manager";
import { Rendition } from "./rendition";
import { JobStatus } from "./types/job-status";
import { VideoOpts } from "./types/video-options";

export class Video {
  public readonly id: string;
  public readonly renditions: Rendition[] = [];
  public queueManager = QueueManager.getInstance();

  public get inputPath() {
    return this.opts.inputPath;
  }

  public get outputPath() {
    return this.opts.outputPath;
  }

  public get status(): JobStatus {
    if (
      this.renditions.some((rendition) => rendition.status === "TRANSCODING")
    ) {
      return "TRANSCODING";
    }
    if (this.renditions.some((rendition) => rendition.status === "ERROR")) {
      return "ERROR";
    }
    if (this.renditions.every((rendition) => rendition.status === "COMPLETE")) {
      return "COMPLETE";
    }
    return "READY";
  }

  public constructor(private readonly opts: VideoOpts) {
    this.id = generateHash(
      opts.inputPath + Math.random() + Date.now().toString()
    );
    const ladder = encodingLadder[opts.quality];
    ladder.forEach((settings) => {
      this.renditions.push(new Rendition(this, settings));
    });
  }

  public transcode() {
    if (this.status === "TRANSCODING") {
      throw new Error("Video is already transcoding");
    }
    if (this.status === "COMPLETE") {
      throw new Error("Video has already been transcoded");
    }
    this.queueManager.addToLog({
      videoId: this.id,
      overallStatus: this.status,
      timestamp: Date.now(),
      message: "Starting transcode",
    });
    return Promise.all(
      this.renditions.map((rendition) => rendition.transcode())
    );
  }

  public getFailedRenditions() {
    return this.renditions.filter((rendition) => rendition.status === "ERROR");
  }

  public getCompletedRenditions() {
    return this.renditions.filter(
      (rendition) => rendition.status === "COMPLETE"
    );
  }
}
