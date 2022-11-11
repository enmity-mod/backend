import { InteractionCommandClient } from 'detritus-client';
import { createLogger } from '@structures/logger';
import Database from '@structures/database';
import { ClientOptions } from '@constants';

class Client extends InteractionCommandClient {
   logger = createLogger('Client');

   constructor() {
      super(process.env.TOKEN!, ClientOptions);
   }

   async init() {
      try {
         this.logger.debug('Registering commands...');
         this.addMultipleIn('commands');
         this.logger.info('Commands registered.');

         await Database.connect();

         this.logger.debug('Attempting to connect to the gateway...');
         await this.run();
      } catch (e) {
         this.logger.error('Gateway failed to connect:', e);
      }
   }
}

export default new Client();