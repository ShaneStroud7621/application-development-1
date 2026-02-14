# Week 03 - Node.js Assignment

## What is `package.json`?

`package.json` is a configuration file for Node.js projects that contains metadata about the project, such as its name, version, and scripts. It is used by npm (Node Package Manager) to manage project dependencies and define executable scripts. In this project, it defines two scripts: `start` and `dev`.

## What is `process.env`?

`process.env` is a global object in Node.js that provides access to environment variables. Environment variables are key-value pairs that exist outside of the application code and can be used to configure the application without hardcoding values. In our `index.js`, we use `process.env.PORT` and `process.env.NODE_ENV` to read configuration values, with fallback defaults.

## What does `npm start` run?

`npm start` executes the command defined in the `"start"` script in `package.json`. In this project, it runs `node index.js`, which starts the Node.js application by executing the `index.js` file.

## Learning Resources

- [Node.js Official Documentation](https://nodejs.org/en/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Node.js process.env Documentation](https://nodejs.org/api/process.html#processenv)

## Bugs Encountered

During the setup of this week's assignment, there was a conflict with an existing `week03` file at the repository root. This file was only 1 byte in size and prevented the creation of a `week03/` directory. The solution was to delete the existing `week03` file before creating the new directory structure.
