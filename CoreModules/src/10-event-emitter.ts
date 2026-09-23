/**
 * used to emit events like:
 * user registered
 * send welcome email
 * write log
 * notify some other service
 *
 * emit and listen / produce and consume events
 *
 * .on() - register a listener
 * .once() - register a listner and run it once
 * .emit() - trigger and send events to listners
 */

import EventEmitter from "node:events";

type TUser = {
  id: number;
  email: string;
};

const appEmitter = new EventEmitter();

appEmitter.on("user:registered", (data: TUser) => {
  console.log(`welcome ${data.email}`);
});

function regsiterUser(): void {
  const user: TUser = {
    id: 1,
    email: "sidd@gmail.com",
  };

  appEmitter.emit("user:registered", user);

  console.log("user registered successfully");
}

regsiterUser();
