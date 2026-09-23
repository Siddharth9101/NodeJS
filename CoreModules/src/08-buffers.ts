/**
 * buffers - raw binary data - (data in bytes)
 * reading files
 * receiving http req body
 * working with streams
 * handling images, pdfs, videos
 * ercryption and hashing
 *
 * while strings are human readable buffers are faster for machines
 */

// creating buffer from text - logged in hexa decimal format
// const textBuffer = Buffer.from("Siddharth");
// console.log(textBuffer);

// getting back in string
// console.log(textBuffer.toString("utf-8"));

// length
// console.log(textBuffer.length);

// alloc - fixed allocation of buffer length
// const fixedBuffer = Buffer.alloc(5);
// console.log(fixedBuffer);

// write to exiting buffer
// fixedBuffer.write("API");

// combining buffer chunks
// const chunks = [
//   Buffer.from("Hello "),
//   Buffer.from("Siddharth "),
//   Buffer.from("Saxena"),
// ];

// console.log(Buffer.concat(chunks).toString("utf-8"));
