import { ClientOptions } from 'discord.js';

interface EnmityClientOptions extends ClientOptions {
  prefixes: string[];
}

export { EnmityClientOptions as ClientOptions };