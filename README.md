# Getting Started with NodeBot

NodeBot is a mutlifunctional Discord Bot with a <b>music</b> Command to play music from Spotify, Soundcloud and
Youtube in your discord voicechannel. <br> 
This bot was created with the node.js javascript framework and the discord.js API
<br>see more:
<br>discord.js: https://discord.js.org/#/
<br>node.js: https://nodejs.org/en/

## Requirements and Preparation
This Application implements following requirements:
<ul>
    <li><a href="https://discord.js.org/#/">discord.js v13.6.0+</a></li>
    <li><a href="https://www.npmjs.com/package/nodemon">nodemon v2.0.15+ for dev mode</a></li>
    <li><a href="https://www.npmjs.com/package/colors">colors v1.4.0+ for console colors</a></li>
    <li><a href="https://distube.js.org/#/">distube 3.3.2+</a></li>
</ul>
Before you can launch the Applcation you need to install all <br>requirements</br> listed above. <br>
To do this just run following command:

### `npm install`

after that you have to edit the <b>"configuration.json"</b> file directly in the root folder. Change the following lines to your client id and token.

### 
    "token": "TOKEN HERE",
    "clientId": "CLIENT ID HERE",

you can find the id and token of your bot on the discord developer portal <br>(https://discord.com/developers/applications)
<br><br>now your done! Your application is ready to start! 🎉
## Available Scripts

In the project root directory, you can run following scripts:

### `npm run deploy`

This bot uses the newest feature of discord.js v13 called "slash commands". Because of that we need to register
the files in the ./commands folder as valid commands.

### `npm run start`

Runs the app in the normal mode.\
this script combines the normal launch and the deploy of commands. 
Changes in the code will have no effect until the client is restarted.

### `npm run dev`

Launches the developer mode.\
In this mode you can change the code and it will be updated without
restarting the application.

### `npm run test`

Runs the App in the Debug mode for developing and finding Bugs/Errors

<!-- ## Learn More About this App -->
