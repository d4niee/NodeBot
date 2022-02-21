var colors = require('colors');

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

    /* sets the activity and online status of the bot and prints
       some console information output
    PARAMETER     TYPE             DESCRIPTION
    client        Discord.Client   Discord Bot */
	execute(client) {
		console.log(`[✓] Ready! Logged in as ${client.user.tag}`.green);
        let inviteUrl = url + clientId + permissionLevel
        console.log("\n[i] Invite Link: " + inviteUrl.yellow)
        // print a list of all running servers
        console.log('\n[i] Bot runs on following servers:')
        const Guilds = client.guilds.cache.map(guild => guild.id);
        console.log(Guilds);
        // bot configuration
        client.user.setActivity(activity, {type: activityType})
        client.user.setStatus(status)
	},
};