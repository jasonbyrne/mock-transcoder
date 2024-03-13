import { createHash } from "crypto";

export const generateHash = (str: string): string => {
  return createHash("sha256").update(str).digest("hex");
};
