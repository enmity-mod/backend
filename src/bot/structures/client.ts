import Commands from '@bot/managers/commands';
import { Options } from '@common/constants';
import { createLogger } from '@logger';
import { Client } from 'discord.js';

export default new class extends Client {
  logger = createLogger('Client');
  commands = new Commands();

  constructor() {
    super(Options.Bot);
  }

  initialize() {
    this.login(process.env.BOT_TOKEN);
  }
};