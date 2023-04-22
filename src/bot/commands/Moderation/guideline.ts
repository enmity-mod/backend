import { codeBlock, EmbedBuilder, Message } from 'discord.js';
import Command from '@bot/structures/command';
import { Colors, Emotes } from '@constants';
import Database from '@db';

class Guideline extends Command {
  name = 'guideline';
  description = 'Lists a guideline.';

  async run(msg: Message, args: string[]) {
    const [guideline] = args;

    if (!guideline || Number.isNaN(guideline)) {
      return msg.reply(`${Emotes.error} Please provide a valid guideline number.`);
    }

    const guidelines = await Database.instance.collection('guidelines');
    const payload = await guidelines.findOne({ number: Number(guideline) });

    if (payload) {
      const embed = new EmbedBuilder();

      embed.setColor(Colors.Brand);
      embed.setTitle(payload.summary);
      embed.addFields([
        {
          name: `Guideline ${guideline}`,
          value: codeBlock(payload.description)
        }
      ]);

      return msg.reply({ embeds: [embed] });
    }

    return msg.reply(`${Emotes.error} I couldn't find a guideline matching your query.`);
  }
}

export default new Guideline();
