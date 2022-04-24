export const nestJSTestApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://nestjs-test-api-djaq2jlkla-nw.a.run.app"
    : "http://localhost:3000";
