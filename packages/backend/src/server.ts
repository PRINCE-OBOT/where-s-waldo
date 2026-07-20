import { env } from "../env.js";
import app from "./app.js";

app.listen(env.PORT, () => {
  console.log(`Listening at http://localhost:${env.PORT}`);
});
