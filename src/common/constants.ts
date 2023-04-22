import type { ClientOptions } from '@typings/bot/client';
import { GatewayIntentBits } from 'discord.js';
import type { RouterOptions } from 'express';
import path from 'path';

export const Colors = {
  Brand: 4406700
} as const;


export const Channels = {
  FAQ: '1033951806159605780'
} as const;


export const Links = {
  Patreon: 'https://patreon.com/enmityapp'
} as const;


export const Paths = {
  Root: path.resolve(__dirname, '..', '..'),
  Source: path.resolve(__dirname, '..'),
  Bot: {
    Commands: path.resolve(__dirname, '..', 'bot', 'commands')
  }
} as const;


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
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
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
} as const;


export const Emotes = {
  sucess: '<:success:816413306453098516>',
  error: '<:error:816413456038232074>'
} as const;

export enum Roles {
  Developer = '961789343146577973',
  Staff = '950850582984392704',
  Supporter = '997233808522874910',
  Contributor = '967799585844113418'
};