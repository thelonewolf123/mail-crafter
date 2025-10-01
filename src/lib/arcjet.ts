import arcjet, { fixedWindow } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    fixedWindow({
      mode: "LIVE", // actually enforce
      window: "1m", // 1 minute
      max: 5, // max 5 requests
    }),
  ],
});
