import { InteractionCommandClient, InteractionCommandClientOptions } from 'detritus-client';
import { GatewayIntents } from 'detritus-client-socket/lib/constants';
import { createLogger } from '@logger';
import { Paths } from '@constants';

class Client extends InteractionCommandClient {
   gateway = this.client;
   logger = createLogger('Discord', 'Client');

   constructor() {
      super(process.env.TOKEN!, {
         useClusterClient: true,
         gateway: {
            autoReconnect: true,
            compress: true,
            guildSubscriptions: true,
            intents: [
               GatewayIntents.GUILDS,
               GatewayIntents.GUILD_MESSAGES,
               GatewayIntents.DIRECT_MESSAGES
            ],
            presence: {
               status: 'idle',
               activity: {
                  name: 'the server.',
                  type: 3
               }
            }
         }
      } as InteractionCommandClientOptions);
   }

   async init() {
      try {
         this.logger.debug('Registering commands...');
         this.addMultipleIn(Paths.Bot.Commands, { isAbsolute: true });
         this.logger.info('Commands registered.');

         this.logger.debug('Attempting to connect to the gateway...');
         await this.run();
      } catch (e) {
         this.logger.error('Gateway failed to connect:', e);
      }
   }
}

export default new Client();