const format = require('../format')
const coinmarketcap = require('../api/coinmarketcap')

module.exports.value = (reply, message) => {
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
