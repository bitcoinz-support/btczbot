const format = require('../format')
const coinmarketcap = require('../api/coinmarketcap')
const insightexplorer = require('../api/insightexplorer')

const blockSize = 12500

const earnings = (reply, message) => {
    const hashes = parseInt(message.match[1])
    const hours = parseInt(message.match[2]) || 24

    let BTCZEarnings = 0,
        BTCEarnings = 0,
        USDEarnings = 0

    const callback = () => reply(
        message,
        `${hours} Hour Profitability for *${format.hashrate(hashes)}* (based on the last 8 hrs of difficulty):\n` +
            `- BTCZ: *${format.coins(BTCZEarnings)}*\n` +
            `- BTC: *${format.coins(BTCEarnings)}*\n` +
            `- USD: *${format.usd(USDEarnings)}*\n` +
            `Not accurate? Let @equipool.1ds.us know!`
    )

    insightexplorer.difficulty().then(difficulty => {
        BTCZEarnings = ((hashes * blockSize) / (difficulty * 8192)) * (hours * 60 * 60)

        coinmarketcap.BTCZTicker().then(body => {
            USDEarnings = BTCZEarnings * body.price_usd
            BTCEarnings = BTCZEarnings * body.price_btc

            callback()
        })
    })
}

module.exports.init = (controller, general) => {
    controller.hears(
        ['!earnings (.*) (.*)', '!earnings (.*)'],
        'bot_message',
        (bot, message) => message.channel == general
            ? bot.reply(message, 'Please use #bot-chat for this command. (telegram: https://t.me/joinchat/GIIFnhKijb9hWUskgwpxoA)')
            : earnings(bot.reply, message)
    )

    controller.hears(
        ['!earnings (.*) (.*)', '!earnings (.*)'],
        'ambient,mention',
        (bot, message) => earnings(bot.whisper, message)
    )

    controller.hears(
        ['!earnings (.*) (.*)', '!earnings (.*)'],
        'direct_message,direct_mention',
        (bot, message) => earnings(bot.reply, message)
    )
}
