import { MongoClient } from 'mongodb';
import { createLogger } from './logger';

class Database {
   client = new MongoClient(process.env.DB_URL!);
   logger = createLogger('Database');

   async connect() {
      this.logger.debug('Attempting to connect to the database...');
      await this.client.connect();
      this.logger.success('Connected to the database.');
   }

   get instance() {
      return this.client?.db?.('enmity');
   }
}

export default new Database();