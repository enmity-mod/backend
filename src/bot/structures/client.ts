import { Options } from '@common/constants';
import { createLogger } from '@logger';
import { Client } from 'discord.js';

import Infractions from '@bot/managers/infractions';
import Commands from '@bot/managers/commands';

export default new class extends Client {
  logger = createLogger('Client');
  infractions = new Infractions();
  commands = new Commands();

  constructor() {
    super(Options.Bot);
  }

  async initialize() {
    await this.login(process.env.BOT_TOKEN);
  }
};