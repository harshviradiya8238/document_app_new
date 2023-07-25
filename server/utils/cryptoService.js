const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const initVector = process.env.CRYPTO_IV;
const Securitykey = process.env.CRYPTO_KEY;

const cryptoService = {
  encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
  },
  decrypt(text) {
    const decipher = crypto.createDecipheriv(
      algorithm,
      Securitykey,
      initVector
    );
    let decryptedData = decipher.update(text, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
  },
};

module.exports = cryptoService;
