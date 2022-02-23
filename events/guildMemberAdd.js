
/* Emitted when a new user joins a guild. */
module.exports = {

	name: 'guildMemberAdd',
	
	/* Emitted whenever a user joins a guild.
	PARAMETER     TYPE               DESCRIPTION
	member        GuildMember        The member that has joined a guild */
	execute(member) {
        console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
		try {
			// send dm to user
			member.send('welcome');
		} catch (error) {
			console.log(error)
		}
	},
};