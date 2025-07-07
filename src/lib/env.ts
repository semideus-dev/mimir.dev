const env = {
  databaseUrl: process.env.DATABASE_URL,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,

  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  streamApiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
  streamSecret: process.env.STREAM_SECRET,

  openAiApiKey: process.env.OPEN_AI_API_KEY,
};

export default env;
