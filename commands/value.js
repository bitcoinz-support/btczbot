const format = require('../format')
const coinmarketcap = require('../api/coinmarketcap')

const value = (reply, message) => {
    const btcz = parseInt(message.match[1])

    let BTCValue = 0,
        USDValue = 0

    const callback = () => {
        reply(
            message,
            `Value of *${format.coins(btcz)} BTCZ*:\n` +
                `- BTC: *${format.coins(BTCValue)}*\n` +
                `- USD: *${format.usd(USDValue)}*`
        )
    }

    coinmarketcap.BTCZTicker().then(body => {
        USDValue = btcz * body.price_usd
        BTCValue = btcz * body.price_btc

        callback()
    })
}

module.exports.init = (controller, general) => {
    controller.hears(
        ['!value (.*)'],
        'bot_message',
        (bot, message) => message.channel == general
            ? bot.reply(message, 'Please use #bot-chat for this command. (telegram: https://t.me/joinchat/GIIFnhKijb9hWUskgwpxoA)')
            : value(bot.reply, message)
    )

    controller.hears(
        ['!value (.*)'],
        'ambient,mention',
        (bot, message) => value(bot.whisper, message)
    )

    controller.hears(
        ['!value (.*)'],
        'direct_message,direct_mention',
        (bot, message) => value(bot.reply, message)
    )
}
