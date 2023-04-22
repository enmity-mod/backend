import { Snowflake } from 'discord.js';

export interface Infraction {
  type: 'ban' | 'mute' | 'warn' | 'kick';
  reason: string;
  id: number;
  offender: Snowflake;
  punisher: Snowflake;
}