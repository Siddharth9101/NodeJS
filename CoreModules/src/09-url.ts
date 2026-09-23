const url = new URL("http://localhost:3000/users?page=2&limit=10&sort=latest");

// console.log(url.href); // full
// console.log(url.protocol); // http: or https:
// console.log(url.hostname); // locahost, etc
// console.log(url.host); // locahost:3000, etc with port
// console.log(url.pathname); // /users
// console.log(url.search); // ?page=2&limit=10&sort=latest - query params

// console.log(url.searchParams.get("page"));
// console.log(url.searchParams.get("limit"));
// console.log(url.searchParams.get("sort"));
// searchParams.set("page", "10")

// creating query params
// const qParams = new URLSearchParams({
//   page: "3",
//   limit: "10",
//   sort: "latest",
// });

// console.log(qParams.toString());
