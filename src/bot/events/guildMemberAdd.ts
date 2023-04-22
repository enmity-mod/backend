import client from '@bot/structures/client';

client.on('guildMemberAdd', (member) => {
	if(member.joinedAt)
  // member.
  client.logger.success(`${member.user.id} joined.`);
});