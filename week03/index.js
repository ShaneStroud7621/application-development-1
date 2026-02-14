// Identification Header
console.log('Name: ShaneStroud7621');
console.log('Course: CS31103');
console.log('Week: 3');
console.log('');

// Runtime Information
console.log('Node Version:', process.version);
console.log('Current Date/Time:', new Date());
console.log('');

// Configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('PORT:', PORT);
console.log('NODE_ENV:', NODE_ENV);
console.log('');

// Simple Data Object
const appConfig = {
  port: PORT,
  environment: NODE_ENV,
  startedAt: new Date()
};

console.log('Application Configuration:');
console.log(JSON.stringify(appConfig, null, 2));
