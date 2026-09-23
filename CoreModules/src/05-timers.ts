// when we want to run code after some dealy or after repeatedly after some interval

// setTimeout
// clearTimeout
// setInterval
// clearInterval
// setImmediate
// clearImmediate

// function setTimoutExample(): void {
//   console.log("1. This runs first");
//   setTimeout(() => console.log("2. This runs at last"), 1000);
//   console.log("3. This will run at second place");
// }

// setTimoutExample();

// function clearTimeoutExample(): void {
//   console.log("1. This runs first");
//   const timerId = setTimeout(() => console.log("2. This will not run"), 1000);
//   clearTimeout(timerId);
//   console.log("3. This will run at second place");
// }

// clearTimeoutExample();

// function setIntervalExample(): void {
//   let count = 1;
//   const id = setInterval(() => {
//     if (count == 10) {
//       clearInterval(id);
//     }
//     console.log(count++);
//   }, 1000);
// }

// setIntervalExample();

// function setImmediateExample(): void {
//   // runs imeediately after the synchronous code finishes
//   console.log("before setImmediate");
//   setImmediate(() => console.log("inside setImmediate"));
//   console.log("after setImmediate");
// }

// setImmediateExample();
