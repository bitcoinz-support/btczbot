const format = require('../format')
const icanhazdadjoke = require('../api/icanhazdadjoke')

const value = (reply, message) => {
    icanhazdadjoke.newJoke().then(joke => reply(message, joke))
}

module.exports.init = (controller) => controller.hears(
    ['a joke', 'another joke'],
    'ambient,direct_message,direct_mention,mention',
    (bot, message) => value(bot.reply, message)
)
