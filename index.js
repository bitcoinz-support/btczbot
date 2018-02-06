/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

 * Connect to Slack using the real time API
 * Receive messages based on "spoken" patterns
 * Reply to messages
 * Use the conversation system to ask questions
 * Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:
    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:
    token=<MY TOKEN> node slack_bot.js

# USE THE BOT:
  Find your bot inside Slack to send it a direct message.

  Say: "Hello"
  The bot will reply "Hello!"

  Say: "who are you?"
  The bot will tell you its name, where it is running, and for how long.

  Say: "Call me <nickname>"
  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"
  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"
  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:
  Botkit has many features for building cool and useful bots!
  Read all about it here:
    -> http://howdy.ai/botkit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const general = 'C77B7UY80'

if (!process.env.token) {
    console.log('Error: Specify token in environment')
    process.exit(1)
}

const Botkit = require('botkit')
const format = require('./format')

var controller = Botkit.slackbot({
    debug: true,
    json_file_store: './db',
    retry: Infinity,
})

var bot = controller.spawn({
    token: process.env.token
}).startRTM()

/**********
 * Commands
 **********/
const statsCommand = require('./commands/stats')
const earningsCommand = require('./commands/earnings')
const valueCommand = require('./commands/value')
const walletCommand = require('./commands/wallet')

/*********
 * Chatter
 *********/
const random = require('./commands/random')
const support = require('./commands/support')
const jokeCommand = require('./commands/joke')

support.init(controller)
jokeCommand.init(controller)
random.init(controller)

statsCommand.init(controller, general)
earningsCommand.init(controller, general)
valueCommand.init(controller, general)
walletCommand.init(controller, general)
jokeCommand.init(controller)
