import client from '@bot/structures/client';
import { Roles } from '@constants';

client.on('guildMemberUpdate', (previous, current) => {
  const added = [...current.roles.cache.keys()].map(id => {
    if (previous.roles.cache.has(id)) {
      return false;
    }

    return Roles[String(id)];
  }).filter(Boolean);

  const removed = [...previous.roles.cache.keys()].filter(id => {
    if (current.roles.cache.has(id)) {
      return false;
    }
    console.log(Roles[id]);

    return Roles[id];
  });

  if (!added || !removed) return;
  console.log(added, removed);

});