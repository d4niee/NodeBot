const fs = require('fs')
var colors = require('colors');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, token } = require('./configuration.json')

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

try {
    for (const file of commandFiles) {
	    const command = require(`./commands/${file}`)
	    commands.push(command.data.toJSON())
        console.log(`[✓] added command '${file.split('.js')[0]}' successfully!`.green)
    }
} catch (error) {
    console.log(error)
    console.log("[X] error adding command :/")
}

const rest = new REST({ version: '9' }).setToken(token)
try {
    rest.put(Routes.applicationCommands(clientId), { body: commands })
	    .then(() => console.log('[✓] Successfully registered application commands.'.green))
	    .catch(console.error)
    
} catch (error) {
    console.log(error)
    console.log("[X] error putting in the command :/".red)
}