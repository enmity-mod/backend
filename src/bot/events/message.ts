import { ClientOptions } from '@typings/bot/client';
import client from '@bot/structures/client';

client.on('messageCreate', (msg) => {
  if (!msg.content || msg.author.bot || msg.author.id === client.user.id) return;

  // Check for prefix.
  const options = client.options as ClientOptions;
  if (!options.prefixes.some(p => msg.content.indexOf(p) === 0)) return;

  // Search for any matching command
  const [command, ...args] = msg.content.slice(1).split(' ');
  const instance = client.commands.get(command);
  if (!instance) return;

  try {
    const predicate = instance.predicate(msg, args);
    if (!predicate) return;
  } catch (e) {
    return client.commands.logger.error(`${command} predicate failed to run.`, ' \n -', e.message);
  }

  try {
    instance.run(msg, args);
  } catch (e) {
    console.error(e);
    client.commands.logger.error(`${command} failed to run.`, ' \n -', e.message);
    msg.reply('I apologize, but it seems like this command has encountered an internal error. Please do make sure you let my developers know about it.');
  }
});