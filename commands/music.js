const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const path = require('path');
const { options } = require('superagent');

/* description of the command */
const DESC = "Play music in your voice channel!"

/* read emoji list from config json */
const data = JSON.parse(fs.readFileSync(
	path.resolve(__dirname, '../configuration.json'), 'utf-8'))

/* music command */
module.exports = {
	
	data: new SlashCommandBuilder()
	
		/* commandname and description */
		.setName('music')
		.setDescription(DESC)

		/* Subcommand Help */
		.addSubcommand(subcommand => 
			subcommand
				.setName("help")
				.setDescription("get information about the music command"))

		/* Subcommand play */
		.addSubcommand(subcommand => 
			subcommand
				.setName("play")
				.setDescription(`${data.emojies.play} play a song`)
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
		const VoiceChannel = member.voice.channel

		/* when the user is not in a channel or the bot is already playing -> don't join */
		if (!VoiceChannel) 
			return interaction.reply({content: `${data.emojies.warning} Warning: You are not in a voice channel!`, 
				ephemeral: true})
		if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.channelId) 
			return interaction.reply({content: `${data.emojies.warning} Warning: I'm already playing music in the channel ${guild.me.channelId}`,
				ephemeral:true})
		
		try {
			/* choose the selected subcommand (arg) */
			switch(options.getSubcommand()) {
				case "play": {}
				case "volume": {}
				case settings: {
					switch(options.getString("options")) {
						case "skip": {}
						case "queue": {}
						case "pause": {}
						case "resume": {}
						case "stop": {}
					}
				}
			}
		} catch (error) {
			console.log(error)
			/* print error in the textchannel */
			const ErrEmbed = new MessageEmbed()
				.setColor('DARK_RED')
				.setDescription(`ALERT: ${error}`)
			return interaction.reply({embeds: [ErrEmbed]})
		}
	},
}