/**
 * Returns the environment where the server is running.
 * The environment returned is lower-cased.
 */
export function getEnvironment() {
    let env = process.env.NODE_ENV;
    if (!env || env === 'test') {
      env = 'development';
    }
    console.log(`Running server with environment ${env}`);
    return env.toLowerCase();
  }