// Include Next.js, Next Auth and a Next Auth config
const next = require("next");
const nextAuth = require("next-auth");
const nextAuthConfig = require("./auth/next-auth.config");

// Load environment variables from .env
require("dotenv").load();

// Initialize Next.js
const nextApp = next({
  dir: ".",
	dev: process.env.NODE_ENV === "development",
	start: process.env.NODE_ENV === "production",
	port: process.env.PORT || 3000
});
console.log('nextApp ', nextApp);
// Add next-auth to next app
nextApp
  .prepare()
  .then(() => {
    // Load configuration and return config object
    return nextAuthConfig();
  })
  .then(nextAuthOptions => {
    // Pass Next.js App instance and NextAuth options to NextAuth
    return nextAuth(nextApp, nextAuthOptions);
  })
  .then(response => {
    console.log(`Ready on port: ${nextApp.port}`);
  })
  .catch(err => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
