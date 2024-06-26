import express, { json } from "express";
import cors from "cors";
import { corsFunction } from "./utils/cors.js";
import { createRequire } from "module";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/user.routes.js";
import authenticate from "./middlewares/auth.middleware.js";

const require = createRequire(import.meta.url);
const swaggerJson = require("../swagger.json");
export const app = express();

app.use(cors());
app.use(corsFunction);
app.use(json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/users", userRoutes);

export default app;
