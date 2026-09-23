type TUser = {
  id: number;
  name: string;
  role: "student" | "teacher";
};

const users: TUser[] = [
  {
    id: 1,
    name: "Siddharth",
    role: "teacher",
  },
  {
    id: 2,
    name: "Basu",
    role: "student",
  },
];

/**
 * callback - fn that is passed as an argument to another fn
 */

// function findUserCallback(
//   id: number,
//   callback: (err: Error | null, user?: TUser) => void,
// ) {
//   setTimeout(() => {
//     const user = users.find((u) => u.id === id);
//     if (!user) {
//       callback(new Error(`user with id ${id} not found`));
//       return;
//     }
//     callback(null, user);
//   }, 2000);
// }

// findUserCallback(3, (err, user) => {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   console.log(user?.name);
// });

// function findUserPromise(id: number): Promise<TUser> {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = users.find((u) => u.id === id);
//       if (!user) {
//         reject(new Error(`user with id ${id} not found`));
//         return;
//       }

//       resolve(user);
//     }, 2000);
//   });
// }

// findUserPromise(2)
//   .then((user) => console.log(user.name))
//   .catch((err) => console.error(err.message));

// async function findUserAsyncAwait(id: number): Promise<void> {
//   try {
//     const user = await findUserPromise(2);
//     console.log(user.name);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err.message);
//     } else {
//       console.error("something went wrong");
//     }
//   }
// }
// findUserAsyncAwait(2);
