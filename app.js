/**
   Copyright 2022 Daniel Lambrecht

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

// necessary discord.js classes
const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js')
const { token } = require('./configuration.json')

// create new instance of the client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

function setupCommands() {
  client.commands = new Collection()
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
	  const command = require(`./commands/${file}`)
	  // Set a new item in the Collection
	  // With the key as the command name and the value as the exported module
	  client.commands.set(command.data.name, command)
  }
}

// setting up the commands first
setupCommands()

// on start of the client
client.once('ready', () => {
	console.log('Ready!')
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return
  const command = client.commands.get(interaction.commandName)
  if (!command) return
  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!',
      ephemeral: true })
  }
});

client.login(token)