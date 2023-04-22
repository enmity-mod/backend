import { Infraction } from '@typings/bot/infractions';
import Database from '@db';

class Infractions {
  collection = Database.instance.collection('infractions');

  getById(id: number): Promise<Infraction | void> {
    return this.collection.findOne({ id }) as unknown as Promise<Infraction | void>;
  }
}

export default Infractions;