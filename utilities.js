const { Collection } = require('discord.js')
const fs = require('fs')

/**
 * Utility Class is used to setup the Listener
 * and Commands of the bot and for logging 
 */
 module.exports = class Utilities {

  /* init  
  PARAM   TYPE    DESCRIPTION
  client  Client  the bot */
  constructor(client) {
    this.logId = new Date().getTime() // name for the log file
    this.client = client
    this.FILETYPE = ".js"  // valid filetype of the commands in ./commands
  }

  /* initialisation of the event handling */
  setupEvents() {
    const eventFiles = fs.readdirSync('./events')
      .filter(file => file.endsWith(this.FILETYPE));
    for (const file of eventFiles) {
      const event = require(`./events/${file}`);
      if (event.once) {
        this.client.once(event.name, (...args) => event.execute(...args));
      } else {
        this.client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }

  /* initialisation of the commands */
  setupCommands() {
    this.client.commands = new Collection()
    const commandFiles = fs.readdirSync('./commands')
      .filter(file => file.endsWith(this.FILETYPE))
    for (const file of commandFiles) {
	    const command = require(`./commands/${file}`)
	    // Set a new item in the Collection
	    // With the key as the command name and the value as the exported module
	    this.client.commands.set(command.data.name, command)
    }
  }
};