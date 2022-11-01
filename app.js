import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import logger from "morgan";
import session from "express-session";

import router from "./routes/routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sess = {
  secret: "John Loves",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 0.5 * 60 * 60 * 1000 },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app
  .use(session(sess))
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  // .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")));

app.use(router);

export default app;
