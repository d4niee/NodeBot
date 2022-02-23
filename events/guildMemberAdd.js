
/* Emitted when a new user joins a guild. */
module.exports = {

	name: 'guildMemberAdd',
	
	/**
	 * emitted when a new user joins a guild 
	 * @param {GuildMember} member 
	 */
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