const crypto = require("crypto");

const jwtSecret = crypto.randomBytes(64).toString("hex");

console.log("Generated JWT Secret:");
console.log(jwtSecret);
console.log("\nCopy this to your .env file:");
console.log(`JWT_SECRET=${jwtSecret}`);
console.log(
    "\n⚠️  Keep this secret secure and never commit it to version control!"
);
