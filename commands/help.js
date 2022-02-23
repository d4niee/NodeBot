const { SlashCommandBuilder } = require('@discordjs/builders')
const DESC = 'take a look what you can do with this bot :)'

module.exports = {

	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(DESC),

	/* executed code by emitting the ping command  
  	PARAM   		TYPE    		DESCRIPTION
  	interaction  	Interaction  	handling */
	async execute(interaction) {
		await interaction.reply({content: 'ge', ephemeral: true})
	},
};