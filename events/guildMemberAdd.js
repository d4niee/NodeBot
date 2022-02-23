const fs = require('fs');
const path = require('path');
const SERVERNAME = 'LVLUP'

/* read emoji list from config json */
const data = JSON.parse(fs.readFileSync(
	path.resolve(__dirname, '../configuration.json'), 'utf-8'))

/* Emitted when a new user joins a guild. */
module.exports = {

	name: 'guildMemberAdd',
	
	/**
	 * emitted when a new user joins a guild 
	 * @param {GuildMember} member 
	 */
	execute(member) {
		if (member.user.bot) return 
        console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
		try {
			// send dm to user
			member.send(`${data.emojies.waving} **Wilkommen auf dem ${SERVERNAME} Server!**`);
			member.send(`Bitte gib ` + 
			`acht **respektvoll** und **höflich** zu sein und **spamme** nicht in den textkanälen.\n` + 
			`Wenn du fragen hast kannst du dich gerne an die **Serveradmins** wenden! :)`)
		} catch (error) {
			console.log(error)
		}
	},
};