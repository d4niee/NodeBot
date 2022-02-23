const { SlashCommandBuilder } = require('@discordjs/builders')
const DESC = 'take a look what you can do with this bot :)'

module.exports = {

	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(DESC),

	/**
	 * gets called when a user performs the
	 * /help command
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		await interaction.reply({content: 'ge', ephemeral: true})
	},
};