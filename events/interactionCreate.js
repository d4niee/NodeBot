
/* Emitted when a user executes a command */
module.exports = {

	name: 'interactionCreate',
	
    /**
     * executed when a user performs a command
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        const client = require('../app')
        if (!interaction.isCommand()) return
        const command = client.commands.get(interaction.commandName)
        if (!command) return
        try {
          // run command if the command is valid
          await command.execute(interaction)
          //utilities.commandLog(interaction)
        } catch (error) {
          console.error(error)
          await interaction.reply({ content: 'There was an error while executing this command!',
            ephemeral: true })
        }
	},
};