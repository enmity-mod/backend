import { Message } from 'discord.js';

class Command {
  public name: string;
  public description: string;
  public aliases: string[] = [];
  public category: string;

  run(message: Message, args: string[]): any {

  }
}

export default Command;