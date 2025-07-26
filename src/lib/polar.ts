import { Polar } from "@polar-sh/sdk";
import env from "@/lib/env";

export const polarInstance = new Polar({
  accessToken: env.polarAccessToken,
  server: "sandbox",
});

