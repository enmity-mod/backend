import { GatewayIntents } from 'detritus-client-socket/lib/constants';
import { InteractionCommandClientOptions } from 'detritus-client';
import path from 'path';

export const Colors = {
   Brand: 4406700
};

export const ClientOptions: InteractionCommandClientOptions = {
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
};

export const Paths = {
   Bot: {
      Commands: path.resolve(__dirname, '..', 'bot', 'commands')
   },
   Root: path.resolve(__dirname, '..', '..'),
   Source: path.resolve(__dirname, '..')
};