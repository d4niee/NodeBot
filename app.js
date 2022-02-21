// necessary discord.js classes
const { Client, Intents } = require('discord.js')
const { token } = require('./configuration.json')
const Utilities = require('./utilities')

// create new instance of the client with needed intents
const client = new Client({ 
  intents: [ 
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS
  ], 
  partials: [
    'CHANNEL',
  ]
})

const utilities = new Utilities(client)
utilities.setupCommands() // setting up the commands first
utilities.setupEvents()   // adding and init events

/* gets called if a command was send 
PARAMETER     TYPE          DESCRIPTION
interaction   Interaction   handle the interaction */
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) 
    return
  const command = client.commands.get(interaction.commandName)
  if (!command) 
    return
  try {
    // run command if the command is valid
    await command.execute(interaction)
    //utilities.commandLog(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!',
      ephemeral: true })
  }
});

// login with bot token destinated in configuration.json
client.login(token)