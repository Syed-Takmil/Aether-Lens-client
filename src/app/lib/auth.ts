import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/aetherlens";
const client = new MongoClient(URI);
const db = client.db("aetherlens");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },
  // 🟩 CONNECTED: Forces session mappings to align 'image' directly across all pipeline handshakes
  user: {
    fields: {
      image: "image",
    }
  }
});