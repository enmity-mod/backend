import { EmbedBuilder, Message } from 'discord.js';
import Command from '@bot/structures/command';
import client from '@bot/structures/client';
import { Colors, Emotes } from '@constants';

class Help extends Command {
  name = 'help';
  description = 'Displays help about each command the bot features.';

  run(msg: Message, args: string[]) {
    const [cmd] = args;

    if (cmd) return this.handleCommandDetails(msg, cmd);

    const categories = client.commands.getCategories();
    const embed = new EmbedBuilder();

    embed.setColor(Colors.Brand);

    for (const category of categories) {
      const commands = client.commands.getAllByCategory(category);

      embed.addFields({
        name: category,
        value: commands.map(command => `» **${command.name}** - ${command.description}`).join('\n')
      });
    }

    return msg.reply({ embeds: [embed] });
  }

  handleCommandDetails(msg: Message, command: string) {
    const cmd = client.commands.get(command);
    if (!cmd) return msg.reply(`${Emotes.error} I couldn't find a command matching your query.`);

    const embed = new EmbedBuilder();

    embed.setTitle(cmd.name);
    embed.setColor(Colors.Brand);
    embed.addFields([
      { name: 'Description', value: cmd.description },
      { name: 'Aliases', value: cmd.aliases.join(', ') || 'None' },
      { name: 'Category', value: cmd.category }
    ]);

    return msg.reply({ embeds: [embed] });
  }
}

export default new Help();
