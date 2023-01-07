import type { ClientOptions } from '@typings/bot/client';
import { GatewayIntentBits } from 'discord.js';
import type { RouterOptions } from 'express';
import path from 'path';

export const Colors = {
  Brand: 4406700
};

export const Channels = {
  FAQ: '1033951806159605780'
};

export const Links = {
  Patreon: 'https://patreon.com/enmityapp'
};

export const Paths = {
  Root: path.resolve(__dirname, '..', '..'),
  Source: path.resolve(__dirname, '..'),
  Bot: {
    Commands: path.resolve(__dirname, '..', 'bot', 'commands')
  }
};

export const Options = {
  API: {
    Router: {
      caseSensitive: false
    } as RouterOptions
  },
  Bot: {
    prefixes: ['?', '!', '.', '-'],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    presence: {
      activities: [
        {
          name: 'the server.',
          type: 2
        }
      ],
      status: 'idle'
    }
  } as ClientOptions
};

