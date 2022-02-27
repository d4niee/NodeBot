const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const path = require('path');

var currentVoiceChannelId = null 
var VoiceChannelState = 'FREE'

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
					 option.setName("options")
					 	.setDescription("select an option")
						.addChoice(`${data.emojies.queues} queue`, "queue")
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
		if (VoiceChannelState === 'FREE') {
			currentVoiceChannelId = member.voice.channelId
			VoiceChannelState = 'SELECTED'
		}

		if (!VoiceChannel) 
			return interaction.reply({content: `${data.emojies.warning} Warning: You are not in a voice channel!`, 
				ephemeral: true})

		if (currentVoiceChannelId !== member.voice.channelId) {
			return interaction.reply({content: `${data.emojies.warning} Warning: I'm already playing music in the channel **${guild.me.voice.channel}**`,
				ephemeral:true})
		}

		try {
			/* choose the selected subcommand (arg) */
			switch(options.getSubcommand()) {

				case "play": { 
					client.distube.play(VoiceChannel, options.getString("query"), 
					{
						textChannel: channel, 
						member: member
					})
					return interaction.reply({content: `${data.emojies.note} Music Request Received`})
				 }

				case "volume": {
					const Volume = options.getNumber("percent")
					if (Volume > 100 || Volume < 1) 
						return interaction.reply({content: `you have to specify a number between 1 and 100.`})
					client.distube.setVolume(VoiceChannel, Volume)
					return interaction.reply({content: `Volume has been set to \`${Volume}%\``})
				}

				case "settings": {
					const queue = await client.distube.getQueue(VoiceChannel)
					if (!queue)
						return interaction.reply({content: `${data.emojies.error} There is no queue`})

					switch(options.getString("options")) {
						case "skip": 
							await queue.skip(VoiceChannel)
							return interaction.reply({content: `${data.emojies.skip} Song has been skipped`})
						case "queue": 
						if (!queue) return interaction.reply(`${data.emojies.error} | There is nothing playing!`)
						const q = queue.songs
						  .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
						  .join('\n')
						return interaction.reply(`${data.emojies.queues} | **Server Queue**\n${q}`)

						case "pause": 
							console.log("queue")
							await queue.pause(VoiceChannel)
							return interaction.reply({
								content: `${data.emojies.pause} Song has been paused`
							})
						case "resume": 
							await queue.resume(VoiceChannel)
							return interaction.reply({
								content: `${data.emojies.resume} Song has been resumed`
							})
						case "stop": 
							await queue.stop(VoiceChannel)
							currentVoiceChannelId = null
							VoiceChannelState = 'FREE'
							return interaction.reply({
								content: `${data.emojies.stop} Music has been stopped`})
					}
				}
				default:
					return interaction.reply({
						content: `${data.emojies.error} Did not find a subcommand like that :/`,
						ephemeral: true
					})
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