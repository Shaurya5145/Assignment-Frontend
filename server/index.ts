import express from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const app = express();
const port = parseInt(process.env.PORT || "5000", 10);
const isProduction = process.env.NODE_ENV === "production";

// Session configuration
const MemoryStoreSession = MemoryStore(session);

app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  store: new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Basic passport configuration
passport.use(new LocalStrategy(
  (username: string, password: string, done) => {
    // This is a placeholder implementation
    // In a real app, you'd verify against a database
    if (username === "demo" && password === "demo") {
      return done(null, { id: "1", username: "demo" });
    }
    return done(null, false);
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  // This is a placeholder implementation
  done(null, { id, username: "demo" });
});

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Serve frontend in production
if (isProduction) {
  app.use(express.static("dist"));
  
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "dist" });
  });
} else {
  // Development mode with Vite
  const setupVite = async () => {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
      configFile: "./vite.config.frontend.ts"
    });
    
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
  };
  
  setupVite().catch(console.error);
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});