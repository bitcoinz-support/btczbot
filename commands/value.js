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

module.exports.init = controller => controller.hears(
    ['!value (.*)'],
    'ambient,bot_message,direct_message,direct_mention,mention',
    (bot, message) => value(bot.reply, message)
)
