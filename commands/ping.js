const { SlashCommandBuilder } = require('@discordjs/builders')
const DESC = "Replies with Pong"

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(DESC),

	/* executed code by emitting the ping command  
  	PARAM   		TYPE    		DESCRIPTION
  	interaction  	Interaction  	handling */
	async execute(interaction) {
		await interaction.reply(
			{ content: 'Pong! 🏓 @' + interaction.user.username, 
			  ephermal: true })
	},
}