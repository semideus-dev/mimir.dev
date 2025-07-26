import { openAPI } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { polar, checkout, portal } from "@polar-sh/better-auth";
import { polarInstance } from "@/lib/polar";

import env from "@/lib/env";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
  plugins: [
    openAPI(),
    polar({
      client: polarInstance,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          authenticatedUsersOnly: true,
          successUrl: "/upgrade",
        }),
        portal(),
      ],
    }),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    github: {
      clientId: env.githubClientId as string,
      clientSecret: env.githubClientSecret as string,
    },
    google: {
      clientId: env.googleClientId as string,
      clientSecret: env.googleClientSecret as string,
    },
  },
});
