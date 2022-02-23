var colors = require('colors');
const Utilities = require('../utilities')

const { 
    clientId, 
    status, 
    activity, 
    activityType, 
    url, 
    permissionLevel 
} = require('../configuration.json')

/* Emitted when the client becomes ready to start working. */
module.exports = {

	name: 'ready',
	once: true,


    /**
     * get only runs one time 
     * emitted when the bot is online and ready
     * @param {Client} client discord client 
     */
	execute(client) {
        const utilities = new Utilities(client)
        utilities.asciiArt()
		console.log(`\n[i] Ready! Logged in as ${client.user.tag}`.blue);
        let inviteUrl = url + clientId + permissionLevel
        console.log("\n[i] Invite Link: ".blue + inviteUrl)
        // print a list of all running servers
        console.log('\n[i] Bot runs on following servers:'.blue)
        const Guilds = client.guilds.cache.map(guild => guild.id);
        console.log("\t" + Guilds);
        // bot configuration
        client.user.setActivity(activity, {type: activityType})
        client.user.setStatus(status)
        console.log("\n")
	},
};