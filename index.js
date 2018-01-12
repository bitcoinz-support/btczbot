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

if (!process.env.token) {
    console.log('Error: Specify token in environment')
    process.exit(1)
}


const Botkit = require('botkit')
const os = require('os')
const format = require('./format')

const statsCommand = require('./commands/stats')
const earningsCommand = require('./commands/earnings')
const valueCommand = require('./commands/value')
const walletCommand = require('./commands/wallet')


var controller = Botkit.slackbot({
    debug: true,
    json_file_store: './db',
})

var bot = controller.spawn({
    token: process.env.token
}).startRTM()


controller.hears(['thanks', 'thank you'], 'direct_message,direct_mention,mention', (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            return bot.reply(message, 'You are most welcome, ' + user.name + '!!')
        }

        bot.reply(message, 'Anytime!')
    })
})

controller.hears(['you around'], 'direct_message,direct_mention,mention', (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            return bot.reply(message, 'I\'m here for you, ' + user.name + '!!')
        }

        bot.reply(message, 'Present!')
    })
})

controller.hears(['love'], 'direct_message,direct_mention,mention', (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            return bot.reply(message, 'I love you too, ' + user.name + '!!')
        }

        bot.reply(message, 'I love you too, man!')
    })
})

controller.hears(['lol', ':laughing:'], 'direct_message,direct_mention,mention', (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            return bot.reply(message, 'don\'t laugh at me, ' + user.name + '!!')
        }

        bot.reply(message, 'Stop laughing at me!')
    })
})

controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention,bot_message', (bot, message) => {
    var name = message.match[1]
    controller.storage.users.get(message.user, (err, user) => {
        if (!user) {
            user = {id: message.user}
        }

        user.name = name

        controller.storage.users.save(user, (err, id) =>
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.'))
    })
})

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention,bot_message', (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name)
        } else {
            bot.startConversation(message, (err, convo) => {
                if (!err) {
                    convo.say('I do not know your name yet!')
                    convo.ask('What should I call you?', (response, convo) => {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                // since no further messages are queued after this,
                                // the conversation will end naturally with status == 'completed'
                                callback: (response, convo) => convo.next()
                            },
                            {
                                pattern: 'no',
                                // stop the conversation. this will cause it to end with status == 'stopped'
                                callback: (response, convo) => convo.stop()
                            },
                            {
                                default: true,
                                callback: (response, convo) => {
                                    convo.repeat()
                                    convo.next()
                                }
                            }
                        ])

                        convo.next()
                    }, {'key': 'nickname'}) // store the results in a field called nickname

                    convo.on('end', convo => {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...')

                            controller.storage.users.get(message.user, (err, user) => {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    }
                                }
                                user.name = convo.extractResponse('nickname')
                                controller.storage.users.save(user, (err, id) =>
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.')
                                )
                            })
                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!')
                        }
                    })
                }
            })
        }
    })
})

controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'], 'ambient,bot_message', (bot, message) => {
    const hostname = os.hostname()
    const uptime = format.uptime(process.uptime())

    bot.reply(message,
        ':robot_face: I am a bot named <@' + bot.identity.name +
        '>. I have been running for ' + uptime + ' on ' + hostname + '.')
})

controller.hears(['!stats'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
    statsCommand.stats(bot.reply, message)
})

controller.hears(['!earnings (.*) (.*)', '!earnings (.*)'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
    earningsCommand.earnings(bot.reply, message)
})

controller.hears(['!value (.*)'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
    valueCommand.value(bot.reply, message)
})

controller.hears(['!wallet (.*)'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
    walletCommand.wallet(bot.reply, message)
})

controller.hears(['hello', 'hi', 'hey', 'yo '], 'direct_message,direct_mention,mention', (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            return bot.reply(message, 'Hello ' + user.name + '!!')
        }

        bot.reply(message, 'Hello!')
    })
})

controller.hears(['!wallet', '!wallets'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(
        message,
        'The best, most secure and stable wallet is the full node wallet, also known as the swing wallet: https://github.com/bitcoinz-pod/bitcoinz-wallet/releases/tag/1.1.0_1.3\n\n' +
        'Also available is a community managed bitpay wallet fork, available at https://github.com/bitcoinz-wallets/bitcoinz-copay-wallet/releases with builds for iOS and Linux.\n\n' +
        'We have an Android wallet managed by the community: https://play.google.com/store/apps/details?id=com.btczcom.btcz\n\n' +
        'Other Android wallets that support BTCZ:\n' +
        '- Coinomi Wallet: https://play.google.com/store/apps/details?id=com.coinomi.wallet\n' +
        '- Delta Wallet:  https://play.google.com/store/apps/details?id=io.getdelta.android\n\n' +
        'Delta wallet is available on IOS: https://itunes.apple.com/us/app/apple-store/id1288676542. Coinomi should be releasing one on IOS soon.\n\n' +
        'Lastly, we have a web-based wallet available at https://www.mybitcoinzwallet.com.'
    )
})

// TODO:
// Donation BOt:
// Donation address t1fHHnAXxoPWGY77sG5Zw2sFfGUTpW6BcSZ now has 254851 BTCZ (+275 BTCZ) thank you!
// For more information type *!donate* type *!funds* to see community funds balance
//
// Donate towards BTCZ funds: https://docs.google.com/document/d/1Oe7Vo_zBb05_z8r52qv9lGOekmHDpWbbtNP4GyJeddw
