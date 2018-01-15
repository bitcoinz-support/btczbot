const format = require('../format')
const coinmarketcap = require('../api/coinmarketcap')
const btczexplorer = require('../api/btczexplorer')

const blockSize = 12500
const blockTime = 150

const earnings = (reply, message) => {
    const hashes = parseInt(message.match[1])
    const hours = parseInt(message.match[2]) || 24

    let BTCZEarnings = 0,
        BTCEarnings = 0,
        USDEarnings = 0

    const callback = () => {
        reply(
            message,
            `${hours} Hour Profitability for *${format.hashrate(hashes)}*:\n` +
                `- BTCZ: *${format.coins(BTCZEarnings)}*\n` +
                `- BTC: *${format.coins(BTCEarnings)}*\n` +
                `- USD: *${format.usd(USDEarnings)}*`
        )
    }

    btczexplorer.netowrkHashrate().then(body => {
        BTCZEarnings = 1 / ((body / hashes * blockTime) / (hours * 60 * 60)) * blockSize

        coinmarketcap.BTCZTicker().then(body => {
            USDEarnings = BTCZEarnings * body.price_usd
            BTCEarnings = BTCZEarnings * body.price_btc

            callback()
        })
    })
}

module.exports.init = controller => controller.hears(
    ['!earnings (.*) (.*)', '!earnings (.*)'],
    'ambient,bot_message,direct_message,direct_mention,mention',
    (bot, message) => earnings(bot.reply, message)
)
