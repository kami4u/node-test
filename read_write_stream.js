const { Readable, Writable } = require("stream");

// const outStream = new Writable({
//   write(chunk, enconding, callback) {
//     console.log(chunk.toString());
//     callback();
//   },
// });

// process.stdin.pipe(outStream);

const inStream = new Readable({
  read(size) {
    setTimeout(() => {
      if (this.currentCharCode > 90) {
        this.push(null);
        return;
      }
      this.push(String.fromCharCode(this.currentCharCode++));
    }, 100);
  },
});
inStream.currentCharCode = 65;
inStream.pipe(process.stdout);
