import app from "./app.js";
import { CONFIG } from "./config.js";
import { purgeExpired } from "./auth.js";

purgeExpired().catch(console.error);
setInterval(() => purgeExpired().catch(console.error), 6 * 3600 * 1000).unref();

app.listen(CONFIG.PORT, () => {
  console.log(`Matura Trener radi na http://localhost:${CONFIG.PORT}`);
});
