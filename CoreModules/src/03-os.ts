import * as os from "node:os";

// checking your os
// checking cpu info
// checking memory
// checking home/temp directory etc

console.log(os.platform());
console.log(os.arch());
console.log(os.type());
console.log(os.release());
console.log(os.homedir());
console.log(os.tmpdir());
console.log(os.cpus().length);
console.log(os.cpus()[0].model);
console.log((os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GBs");
console.log((os.freemem() / 1024 / 1024 / 1024).toFixed(2) + " GBs");
