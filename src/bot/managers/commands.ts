import Command from '@bot/structures/command';
import { createLogger } from '@logger';
import glob from 'fast-glob';
import path from 'path';
import fs from 'fs';


class Commands {
  public logger = createLogger('Client', 'Manager', 'Commands');
  public path = path.join(__dirname, '..', 'commands');
  public store = new Map();

  constructor() {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }

    this.initialize();
  }

  async initialize() {
    const files = await glob('**/**.js', { cwd: this.path });

    for (const file of files) {
      try {
        const payload = require(path.join(this.path, file));
        if (!payload.default) {
          throw new Error('Command is missing default export.');
        }

        if (!(payload.default instanceof Command)) {
          throw new Error('File exports non-command class instance.');
        }

        if (!payload.default.category) {
          const segments = file.split('/');
          const category = segments.slice(0, -1);

          payload.default.category = category.join(' → ') || 'Unknown';

          if (!category.length) {
            this.logger.warn(`The command ${payload.default.name} is missing a category parent folder, its category has been set to Unknown.`);
          }
        }

        this.add(payload.default);
      } catch (e) {
        this.logger.error(`Command failed to load. (${file})`, '\n -', e.message);
      }
    }

    this.logger.info(`Loaded ${this.store.size} commands.`);
  }

  get(name: string, searchAliases: boolean = true): Command {
    if (this.store.has(name)) {
      return this.store.get(name);
    }

    if (!searchAliases) return;

    const commands = this.getAll();

    return commands.find(c => ~c.aliases.indexOf(name));
  }

  getAll() {
    return [...this.store.values()];
  }

  getAllByCategory(category: string): Command[] {
    const commands = this.getAll();

    return commands.filter(c => c.category === category);
  }

  getCategories(): string[] {
    const categories = new Set();
    const commands = this.getAll();

    for (const cmd of commands) {
      categories.add(cmd.category);
    }

    return [...categories].sort() as string[];
  }

  add(command: Command) {
    this.validate(command);

    this.store.set(command.name, command);
  }

  validate(command: Command) {
    const keys = ['name', 'description', 'run'];
    const missing = keys.filter(m => !command[m]);

    if (missing.length) {
      throw new Error(`Missing keys on command instance: ${missing.join(', ')}`);
    }
  }
}

export default Commands;