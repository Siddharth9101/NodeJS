// crud on files
// create folders
// fs has sync apis, callback apis and promise apis

import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";

const folderPath = path.join(process.cwd(), "fileSystem");
const syncFilePath = path.join(folderPath, "syncFile.txt");
const callbackFilePath = path.join(folderPath, "callbackFile.txt");
const promiseFilePath = path.join(folderPath, "promiseFile.txt");

type FileResult = {
  style: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
};

function syncExample(): FileResult {
  // write something in file, if file not present node will create it, if already present it will be replaced
  fs.writeFileSync(syncFilePath, "created using fs sync", "utf-8");
  // to append the file content not replace it we can use append sync
  fs.appendFileSync(syncFilePath, " appended content", "utf-8");

  // reading file
  const content = fs.readFileSync(syncFilePath, "utf-8");
  const stats = fs.statSync(syncFilePath);

  return {
    content,
    style: "sync",
    fileName: path.basename(syncFilePath),
    sizeInBytes: stats.size,
  };
}

function callbackExample(): Promise<FileResult> {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      callbackFilePath,
      "created using callback fs api",
      "utf-8",
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        fs.appendFile(callbackFilePath, " appended content", "utf-8", (err) => {
          if (err) {
            reject(err);
            return;
          }
          fs.readFile(callbackFilePath, "utf-8", (err, content) => {
            if (err) {
              reject(err);
              return;
            }

            fs.stat(callbackFilePath, (err, stats) => {
              if (err) {
                reject(err);
                return;
              }

              resolve({
                style: "callback",
                fileName: path.basename(callbackFilePath),
                content,
                sizeInBytes: stats.size,
              });
            });
          });
        });
      },
    );
  });
}

async function promisesExample(): Promise<FileResult> {
  await fsPromises.writeFile(
    promiseFilePath,
    "This is created using fs promise api",
    "utf-8",
  );

  await fsPromises.appendFile(promiseFilePath, " appended text", "utf-8");

  const content = await fsPromises.readFile(promiseFilePath, "utf-8");

  const stats = await fsPromises.stat(promiseFilePath);

  return {
    style: "promises",
    fileName: path.basename(promiseFilePath),
    content,
    sizeInBytes: stats.size,
  };
}

function ensureFolderExists(): void {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

async function main(): Promise<void> {
  try {
    ensureFolderExists();
    const syncRes = syncExample();
    const callbackRes = await callbackExample();
    const promiseRes = await promisesExample();
    console.log(promiseRes);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "something went wrong";
    console.error(msg);
  }
}

main();
