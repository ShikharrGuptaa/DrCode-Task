import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./index.js";
import authService from "../services/auth.service.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("Google profile received:", profile);
        const user = await authService.findOrCreateGoogleUser(profile);
        if (!user) {
          return done(new Error("User not found"), null);
        }
        // console.log("User found or created:", user);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
