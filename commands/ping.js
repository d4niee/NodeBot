const { SlashCommandBuilder } = require('@discordjs/builders')
const DESC = "Replies with Pong"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(DESC),

	async execute(interaction) {
		await interaction.reply(
			{ content: 'Pong! 🏓 @' + interaction.user.username, 
			  ephermal: true })
	},
}