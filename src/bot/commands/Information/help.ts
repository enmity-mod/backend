import Command from '@bot/structures/command';
import client from '@bot/structures/client';
import { Embed, EmbedBuilder, Message } from 'discord.js';
import { Colors } from '@constants';

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
      embed.addFields({
        name: category,
        value: client.commands.getAllByCategory(category).map(command => {
          return `» **${command.name}** - ${command.description}`;
        }).join('\n')
      });
    }

    return msg.reply({ embeds: [embed] });
  }

  handleCommandDetails(msg: Message, command: string) {
    const cmd = client.commands.get(command);
    if (!cmd) return msg.reply('I couldn\'t find a command matching your query.');

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
