import "server-only";

import env from "@/lib/env";

import { StreamClient } from "@stream-io/node-sdk";

export const streamVideo = new StreamClient(
  env.streamApiKey!,
  env.streamSecret!,
  { timeout: 11000 },
);
