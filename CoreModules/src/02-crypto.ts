import crypto from "node:crypto";

// built in node module
// creating random UUIDs
// hashing
// creating token
// encrypt/decrypt data

// randomUUID - universally unique identifier
// console.log(crypto.randomUUID())

// randomBytes - password reset tokens, email verification, session secret, api keys
// console.log(crypto.randomBytes(16).toString('hex'))

// createHash - converting data in fixed length irreversible string - data -> hash
// console.log(crypto.createHash("sha256").update("Siddharth").digest("hex"));

// 1:7:34 createHMAC - hash based message authentication code - this is a signed hash - data + secret -> hash
console.log(
  crypto.createHmac("sha256", "secret-key").update("Siddharth").digest("hex"),
);

// to verify hashes we take the given input and convert into hash and match it with the one we have in db
