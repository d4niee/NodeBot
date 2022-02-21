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
var colors = require('colors');
const { Client, Intents, Collection } = require('discord.js')
const { token, clientId, status, activity, activityTypes, 
    createLogFiles, url, permissionLevel } = require('./configuration.json')

// create new instance of the client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const CMD_FILETYPE = ".js"  // valid filetype of the commands in ./commands
const LOG_ID = new Date().getTime() // name for the log file

function setupCommands() {
  client.commands = new Collection()
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(CMD_FILETYPE))
  for (const file of commandFiles) {
	  const command = require(`./commands/${file}`)
	  // Set a new item in the Collection
	  // With the key as the command name and the value as the exported module
	  client.commands.set(command.data.name, command)
  }
}

// log information about a executed command
function log(interaction) {
  let time = new Date(interaction.createdTimestamp)
  let user = interaction.user.username
  let guild = [interaction.guild, interaction.guildId]
  let logPath = './logs/' + guild[1] // log path is ./log and the guild id as a folder
  console.log(`[i] executed command: { time: ${time}, user: ${user}, guild: {name: ${guild[0]}, id: ${guild[1]} } }`)
  if (!createLogFiles) return
  fs.access(logPath, (error) => {
    // check if current dir already exists
    if (error) 
      fs.mkdir(logPath, (error) => {
        if (error)
          console.log(error)
      })
  })
  const stream = fs.createWriteStream(logPath+"/CMD-LOG_"+LOG_ID+".log", { flags: 'a' });
  stream.write(`[ time: ${time}, user: ${user}, guild: ${guild[0]}, guild_id: ${guild[1]} ]\n`)
  stream.end()
}

// setting up the commands first
setupCommands()

// on start of the client
client.once('ready', () => {
	console.log(`[✓] Successfully logged in!`.green)
  // generate invite link url
  let inviteUrl = url + clientId + permissionLevel
  console.log("\n[i] Invite Link: " + inviteUrl.yellow)
  // print a list of all running servers
  console.log('\n[i] Bot runs on following servers:')
  const Guilds = client.guilds.cache.map(guild => guild.id);
  console.log(Guilds);
  // bot configuration
  client.user.setActivity(activity, {type: activityTypes[4]}) //the type can be "PLAYING", "WATCHING", "STREAMING", "LISTENING"
  client.user.setStatus(status)
  console.log("\n[i] listening for action...")
});

// gets called if a command was send
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) 
    return
  const command = client.commands.get(interaction.commandName)
  if (!command) 
    return
  try {
    // run command if the command is valid
    await command.execute(interaction)
    log(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!',
      ephemeral: true })
  }
});

// login with bot token destinated in configuration.json
client.login(token)