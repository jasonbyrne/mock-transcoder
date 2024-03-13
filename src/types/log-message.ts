import { JobStatus } from "./job-status";

export interface LogMessage {
  timestamp: number;
  message: string;
  videoId?: string;
  overallStatus?: JobStatus;
  renditionId?: string;
  renditionStatus?: JobStatus;
}
