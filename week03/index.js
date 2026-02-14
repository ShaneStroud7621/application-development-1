const name = "ShaneStroud7621";
const course = "CS31103";
const week = "Week 3";

const now = new Date();
const port = process.env.PORT || "3000";
const environment = process.env.NODE_ENV || "development";

console.log("Identification Header");
console.log(name);
console.log(`Course: ${course}`);
console.log(week);
console.log("");

console.log("Runtime Information");
console.log(`Node version: ${process.version}`);
console.log(`Current date/time: ${now}`);
console.log("");

console.log("Configuration via Environment Variables");
console.log(`PORT: ${port}`);
console.log(`NODE_ENV: ${environment}`);
console.log("");

const appConfig = {
  port,
  environment,
  startedAt: now
};

console.log("appConfig");
console.log(JSON.stringify(appConfig, null, 2));
