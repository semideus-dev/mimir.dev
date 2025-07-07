import "server-only";

import env from "@/lib/env";

import { StreamClient } from "@stream-io/node-sdk";

if (!env.streamApiKey || !env.streamSecret) {
  throw new Error("Missing Stream credentials");
}

export const streamVideo = new StreamClient(
  env.streamApiKey,
  env.streamSecret,
  {
    timeout: 11_000,
  },
);
