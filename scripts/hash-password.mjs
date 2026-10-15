// Usage: node scripts/hash-password.mjs
// Prompts for the password (input hidden) and prints a value for the ADMIN_PASSWORD_HASH environment variable,
// and a random value you can use for SESSION_SECRET. The password can also be piped in on stdin.
import { randomBytes, scryptSync } from "crypto";

function readHidden(prompt) {
    return new Promise((resolve, reject) => {
        const { stdin, stdout } = process;
        let value = "";
        stdout.write(prompt);
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding("utf8");
        const finish = () => {
            stdin.setRawMode(false);
            stdin.pause();
            stdin.off("data", onData);
            stdout.write("\n");
        };
        const onData = (chunk) => {
            for (const char of chunk) {
                if (char === "\u0003") {
                    finish();
                    reject(new Error("Cancelled"));
                    return;
                } else if (char === "\r" || char === "\n" || char === "\u0004") {
                    finish();
                    resolve(value);
                    return;
                } else if (char === "\u007f" || char === "\b") {
                    value = value.slice(0, -1);
                } else {
                    value += char;
                }
            }
        };
        stdin.on("data", onData);
    });
}

async function readPiped() {
    let data = "";
    for await (const chunk of process.stdin) data += chunk;
    return data.replace(/\r?\n$/, "");
}

async function getPassword() {
    if (process.argv[2]) {
        console.warn("Warning: passing the password as an argument can leave it in your shell history. Run without arguments to be prompted instead.");
        return process.argv[2];
    }
    return process.stdin.isTTY ? readHidden("Admin password: ") : readPiped();
}

const password = await getPassword().catch(() => process.exit(1));
if (!password || password.length < 12) {
    console.error("Please use a password of at least 12 characters.");
    process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${hash.toString("hex")}`);
console.log(`SESSION_SECRET=${randomBytes(48).toString("base64url")}`);
