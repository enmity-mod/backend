import client from '@bot/structures/client';

client.on('ready', () => {
  client.logger.success('Connected to the gateway.');
});