import path from "node:path";
import process from "node:process";

// build and read paths
// path.join() - joins using the correct seperator according to the current os - / or \

// console.log(process.cwd()); - current working directory
// suppose we want to store users photo in rootDir/uploads/users/photo.jpg, so for correct seperators, it ony creates a path location it does not create a file or folder
const filePath = path.join(process.cwd(), "uploads", "users", "photo.jpg");
const fileName = path.basename(filePath);
const fileExt = path.extname(fileName);
const parentFolder = path.dirname(filePath);
console.log(filePath);
console.log(fileName);
console.log(fileExt);
console.log(parentFolder);
