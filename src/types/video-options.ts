import { Quality } from "../ladder";

export interface VideoOpts {
  inputPath: string;
  outputPath: string;
  quality: Quality;
}
