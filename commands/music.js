const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const path = require('path');

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
				.setDescription(`${data.emojies.help} get information about the music command`))

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
				.setDescription(`${data.emojies.volume} alter the volume`)
				.addNumberOption(option => option.setName("percent").setDescription("10 = 10%").setRequired(true)))
		
		/* Settings subcommand */
		.addSubcommand(subcommand =>
			subcommand
				.setName("settings")
				.setDescription(`${data.emojies.settings} select an option.`)
				.addStringOption(option =>
					 option.setName("option")
					 	.setDescription("select an option")
						.addChoice(`${data.emojies.queue} queue`, "queue")
						.addChoice(`${data.emojies.skip} skip`, "skip")
						.addChoice(`${data.emojies.stop} pause`, "pause")
						.addChoice(`${data.emojies.play} resume`, "resume")
						.addChoice(`${data.emojies.stop} stop`, "stop")
						.setRequired(true))),

	/**
	 * gets called when a user performs the
	 * /music command
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		/* import client from app.js */
		const client = require('../app')
		const { options, member, guild, channel } = interaction
		const VoiceChannel = member.voice.channel

		if (!VoiceChannel) 
			return interaction.reply({content: `${data.emojies.warning} Warning: You are not in a voice channel!`, 
				ephemeral: true})
		if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.channelId) 
			return interaction.reply({content: `${data.emojies.warning} Warning: I'm already playing music in the channel ${guild.me.channelId}`,
				ephemeral:true})
		
		try {
			/* choose the selected subcommand (arg) */
			switch(options.getSubcommand()) {

				case "play": {
					client.distube.playVoiceChannel(VoiceChannel, options.getString("query"), 
						{textChannel: channel, member: member})
					return interaction.reply({content: `Request Received`})
				}

				case "volume": {
					const Volume = options.getNumber("percent")
					if (Volume > 100 || Volume < 1) 
						return interaction.reply({content: `you have to specify a number between 1 and 100.`})
					client.distube.setVolume(VoiceChannel, Volume)
					return interaction.reply({content: `Volume has been set to \`${Volume}%\``})
				}

				case "settings": {
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