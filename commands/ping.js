const { SlashCommandBuilder } = require('@discordjs/builders')
const DESC = "Replies with Pong"

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(DESC),

	/**
	 * gets called when a user performs the
	 * /ping command
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		await interaction.reply(
			{content: 'Pong! 🏓 @' + interaction.user.username})
	},
}