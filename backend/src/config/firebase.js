import admin from "firebase-admin";
import { readFileSync } from "fs";

// You’ll download this JSON from Firebase in the next step
const serviceAccount = JSON.parse(
  readFileSync("./firebase-service-account.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
