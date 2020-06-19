const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const file = process.argv[2];
const { Transform } = require("stream");

const progress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(".");
    callback(null, chunk);
  },
});

// crypto and zip
// fs.createReadStream(file)
//   .pipe(zlib.createGzip())
//   .pipe(crypto.createCipher("aes192", "secret"))
//   .pipe(progress)
//   //.on("data", () => process.stdout.write("."))
//   .pipe(fs.createWriteStream(file + ".zz"))
//   .on("finish", () => console.log("Done"));

// unzip with crypto
fs.createReadStream(file)
  .pipe(crypto.createDecipher("aes192", "secret"))
  .pipe(zlib.createGunzip())
  .pipe(progress)
  //.on("data", () => process.stdout.write("."))
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on("finish", () => console.log("Done"));
