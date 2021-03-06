const format = require('../format')
const coinmarketcap = require('../api/coinmarketcap')
const btczexplorer = require('../api/btczexplorer')

const wallet = (reply, message) => {
    const address = message.match[1]

    let BTCZBalance = 0,
        BTCBalance = 0,
        USDBalance = 0,
        sent = 0,
        received = 0

    const callback = () => {
        reply(
            message,
            `Wallet: *${address}*:\n` +
                `- BTCZ Sent: *${format.coins(sent)}*\n` +
                `- BTCZ Received: *${format.coins(received)}*\n` +
                `- BTCZ Balance: *${format.coins(BTCZBalance)}*\n` +
                `- BTC Balance: *${format.coins(BTCBalance)}*\n` +
                `- USD Balance: *${format.usd(USDBalance)}*`
        )
    }

    btczexplorer.getaddress(address).then(body => {
        BTCZBalance = body.balance
        sent = body.sent
        received = body.received

        coinmarketcap.BTCZTicker().then(body => {
            USDBalance = BTCZBalance * body.price_usd
            BTCBalance = BTCZBalance * body.price_btc

            callback()
        })
    })
}

module.exports.init = (controller, general) => {
    controller.hears(
        ['!wallet (.*)'],
        'bot_message',
        (bot, message) => message.channel == general
            ? bot.reply(message, 'Please use #bot-chat for this command. (telegram: https://t.me/joinchat/GIIFnhKijb9hWUskgwpxoA)')
            : wallet(bot.reply, message)
    )

    controller.hears(
        ['!wallet (.*)'],
        'ambient,mention',
        (bot, message) => wallet(bot.whisper, message)
    )

    controller.hears(
        ['!wallet (.*)'],
        'direct_message,direct_mention',
        (bot, message) => wallet(bot.reply, message)
    )
}
