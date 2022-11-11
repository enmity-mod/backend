import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';
import { codeblock } from 'detritus-client/lib/utils/markup';
import { Embed } from 'detritus-client/lib/utils';
import { Interaction } from 'detritus-client';
import Database from '@structures/database';
import { Colors } from '@constants';

export interface Arguments {
   number: number;
   send?: boolean;
}

export default {
   name: 'guideline',
   description: 'Lists a guideline.',
   options: [
      {
         name: 'number',
         description: 'The guideline to output.',
         type: ApplicationCommandOptionTypes.INTEGER,
         required: true
      },
      {
         name: 'send',
         description: 'Whether to send the message in chat or not.',
         type: ApplicationCommandOptionTypes.BOOLEAN,
         default: true
      }
   ],

   run: async (ctx: Interaction.InteractionContext, { number, send }: Arguments): Promise<void> => {
      const guidelines = await Database.instance.collection('guidelines');
      const payload = await guidelines.findOne({ number });

      if (payload) {
         const embed = new Embed();

         embed.addField(`Guideline ${number}`, codeblock(payload.description));
         embed.setColor(Colors.Brand);

         return ctx.editOrRespond({ flags: send ? 0 : MessageFlags.EPHEMERAL, embed });
      }

      return ctx.editOrRespond({
         flags: MessageFlags.EPHEMERAL,
         content: 'That guideline doesn\'t exist!'
      });
   }
} as Interaction.InteractionCommandOptions;