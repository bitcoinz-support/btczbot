const format = require('../format')
const coinmarketcap = require('../api/coinmarketcap')
const btczexplorer = require('../api/btczexplorer')
const insightexplorer = require('../api/insightexplorer')

const stats = (reply, message) => {
    // NOTE: This waiting deal allows us to make three async calls and finish
    // once all three are done by calling callback on the 3rd one to finish.
    // Wicked awesome find on stackoverflow.
    let waiting = 3

    let stats = []

    const callback = () => reply(message, stats.join('\n'))

    coinmarketcap.BTCZTicker().then(ticker => {
        stats.push(...[
            `Price: *${format.coins(ticker.price_btc)} BTC (${format.usd(ticker.price_usd)})*`,
            `25hr Vol (USD): *${format.usd(ticker['24h_volume_usd'])}*`,
            `Market Cap: *${format.usd(ticker.market_cap_usd)}*`,
            `Supply: *${format.integer(ticker.total_supply)} BTCZ*`,
        ])

        if (--waiting === 0) {
            callback()
        }
    })

    insightexplorer.status().then(ticker => {
        stats.push(...[
            `Difficulty: *${format.integer(ticker.difficulty)}*`,
            `Block Height: *${format.integer(ticker.blocks)}*`,
        ])

        if (--waiting === 0) {
            callback()
        }
    })

    btczexplorer.netowrkHashrate().then(hashrate => {
        stats.push(...[
            `Network Hashrate: *${format.hashrate(hashrate)}*`,
        ])

        if (--waiting === 0) {
            callback()
        }
    })
}

module.exports.init = controller => controller.hears(
    ['!stats'],
    'ambient,bot_message,direct_message,direct_mention,mention',
    (bot, message) => stats(bot.reply, message)
)

