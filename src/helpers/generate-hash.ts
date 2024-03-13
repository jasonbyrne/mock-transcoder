import crypto from "crypto";

export const generateHash = (str: string): string => {
  return crypto.createHash("sha256").update(str).digest("hex");
};
