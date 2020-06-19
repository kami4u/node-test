const dns = require("dns"); // name -- addreses

// dns.lookup("pluralsight.com", (err, address) => {
//   console.log(address);
// });

// dns.resolve4("pluralsight.com", (err, address) => {
//   console.log(address);
// });

// dns.resolve("pluralsight.com", "MX", (err, address) => {
//   console.log(address);
// });

dns.reverse("35.160.8.7", (err, hostname) => {
  console.log(hostname);
});
