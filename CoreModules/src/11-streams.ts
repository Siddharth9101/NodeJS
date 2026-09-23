/**
 * when we want to process data piece by piece
 * read large files
 * upload large files
 * download large files
 * audio/video processing
 * compression
 *
 * pieces are known as chunks
 *
 * these are memory efficient
 *
 * stream types:
 * readable streams - when getting data from a source in streams
 * writable streams - when writing data to a destination in streams
 * transform streams - reading and manipulating the data and forwarding it in streams
 */

import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

const readableStream = Readable.from(["Hello", "Siddharth", "Saxena"]);
const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString("utf-8");
    callback(null, text.toUpperCase());
  },
});

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("chunk received: ", chunk.toString("utf-8"));

    callback(null);
  },
});

// creating pipeline to connect all these

async function main(): Promise<void> {
  try {
    await pipeline(readableStream, uppercaseTransform, writableStream);

    console.log("stream completed");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "something went wrong";
    console.error(msg);
  }
}
main();
