import express, { Request, Response } from 'express';
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { clientError, serverError } from "./controllers/errorsControllers";
import router from "./routes";

dotenv.config();
const app = express();

app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
]);

app.use("/api/v1", router);

app.use(clientError);
app.use(serverError);

export default app;
