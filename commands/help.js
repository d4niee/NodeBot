const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('shows info about the bot'),
	async execute(interaction) {
		await interaction.reply('Help');
	},
};