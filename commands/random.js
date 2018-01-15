const format = require('../format')
const os = require('os')

module.exports.init = controller => {
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

    controller.hears(['hello', 'hi', 'hey', 'yo '], 'direct_message,direct_mention,mention', (bot, message) => {
        controller.storage.users.get(message.user, (err, user) => {
            if (user && user.name) {
                return bot.reply(message, 'Hello ' + user.name + '!!')
            }

            bot.reply(message, 'Hello!')
        })
    })
}
