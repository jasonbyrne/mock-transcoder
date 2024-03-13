import { JobStatus } from "./job-status";

export interface LogMessage {
  videoId: string;
  renditionId?: string;
  overallStatus: JobStatus;
  renditionStatus?: JobStatus;
  timestamp: number;
  message?: string;
}
