import { InteractionCommandClient } from 'detritus-client';
import { createLogger } from '@logger';
import { ClientOptions } from '@constants';
import path from 'path';

class Client extends InteractionCommandClient {
   logger = createLogger('Discord', 'Client');

   constructor() {
      super(process.env.TOKEN!, ClientOptions);
   }

   async init() {
      try {
         this.logger.debug('Registering commands...');

         const commands = path.resolve(__dirname, '..', 'commands');
         this.addMultipleIn(commands, { isAbsolute: true });

         this.logger.info('Commands registered.');

         this.logger.debug('Attempting to connect to the gateway...');
         await this.run();
      } catch (e) {
         this.logger.error('Gateway failed to connect:', e);
      }
   }
}

export default new Client();