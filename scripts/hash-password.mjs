// Usage: node scripts/hash-password.mjs "YourStrongPassword"
// Prints a value for the ADMIN_PASSWORD_HASH environment variable,
// and a random value you can use for SESSION_SECRET.
import { randomBytes, scryptSync } from "crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
    console.error("Please pass a password of at least 12 characters.");
    process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${hash.toString("hex")}`);
console.log(`SESSION_SECRET=${randomBytes(48).toString("base64url")}`);
