import { ClientEvents } from 'detritus-client/lib/constants';
import Client from '@bot/structures/client';

Client.client.subscribe(ClientEvents.READY, () => {
   Client.logger.success('Gateway connected, the bot is online.');
});