const { SlashCommandBuilder } = require('@discordjs/builders')
const DESC = "Play music in your voice channel!"

/* selected emojies for textchannel output */
const emojiList = ['', '']

module.exports = {
	
	data: new SlashCommandBuilder()
	
		/* commandname and description */
		.setName('music')
		.setDescription(DESC)
		
		/* Subcommand play */
		.addSubcommand(subcommand => 
			subcommand
				.setName("play")
				.setDescription("play a song")
				.addStringOption(option => option.setName("query").setDescription("play").setRequired(true)))

		/* Subcommand volume */
		.addSubcommand(subcommand =>
			subcommand
				.setName("volume")
				.setDescription("alter the volume")
				.addNumberOption(option => option.setName("percent").setDescription("10 = 10%").setRequired(true)))
		
		/* Settings subcommand */
		.addSubcommand(subcommand =>
			subcommand
				.setName("settings")
				.setDescription("select an option.")
				.addStringOption(option =>
					 option.setName("option")
					 	.setDescription("select an option")
						.addChoice("queue", "queue")
						.addChoice("skip", "skip")
						.addChoice("pause", "pause")
						.addChoice("resume", "resume")
						.addChoice("stop", "stop")
						.setRequired(true))),

	/**
	 * gets called when a user performs the
	 * /music command
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		/* import client from app.js */
		const client = require('../app')
		const { option, member, guild, channel } = interaction
		await interaction.reply({content: client.user.tag})
	},
}