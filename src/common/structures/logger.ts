import 'lighter-colors';

export function log(...args: string[]): void {
   return console.log('»'.gray, ...args);
}

export function error(...args: string[]): void {
   return console.error('»'.red, ...args);
}

export function success(...args: string[]): void {
   return console.log('»'.green, ...args);
}

export function warn(...args: string[]): void {
   return console.warn('»'.yellow, ...args);
}

export function debug(...args: string[]): void {
   if (!~process.argv.indexOf('--debug')) return;

   return console.debug('»'.gray, ...args);
}

export function info(...args: string[]): void {
   return console.info('»'.blue, ...args);
}

export function createLogger(...callers: string[]) {
   const prefix = callers.join(' → ') + ':';

   return {
      log: (...args) => log(prefix, ...args),
      error: (...args) => error(prefix.red, ...args),
      success: (...args) => success(prefix.green, ...args),
      warn: (...args) => warn(prefix.yellow, ...args),
      debug: (...args) => debug(prefix.gray, ...args),
      info: (...args) => info(prefix.blue, ...args),
   };
}