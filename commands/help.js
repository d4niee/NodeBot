const { SlashCommandBuilder } = require('@discordjs/builders')
const DESC = 'take a look what you can do with this bot :)'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(DESC),

	async execute(interaction) {
		await interaction.reply({content: "Help", ephermal: true})
	},
};