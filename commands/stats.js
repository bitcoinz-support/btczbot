const request = require('request-promise')
const NodeCache = require('node-cache')
const format = require('../format')
const coinmarketcap = require('../api/coinmarketcap')
const btczexplorer = require('../api/btczexplorer')

const cache = new NodeCache({
    stdTTL: 300
})

const fetchBTCZStatus = () => request({
    uri: 'https://explorer.btcz.rocks/api/status',
    json: true,
})
// {
//     info: {
//         version: 1010150,
//         protocolversion: 170002,
//         blocks: 70438,
//         timeoffset: 0,
//         connections: 105,
//         proxy: "",
//         difficulty: 210612.0608549607,
//         testnet: false,
//         relayfee: 0.000001,
//         errors: "",
//         network: "livenet"
//     }
// }


module.exports.stats = (reply, message) => {
    // NOTE: This waiting deal allows us to make three async calls and finish
    // once all three are done by calling callback on the 3rd one to finish.
    // Wicked awesome find on stackoverflow.
    let waiting = 3

    let stats = cache.get('stats')

    const callback = () => {
        cache.set('stats', stats, 10)
        reply(message, stats.join('\n'))
    }

    // We have the data -- call callback and return
    if (undefined !== stats) {
        return callback()
    }

    stats = []

    // Fetch data from coinmarketcap
    if (undefined !== cache.get('stats-cmm')) {
        stats.push(...cache.get('stats-cmm'))
        if (--waiting === 0) callback()
    } else {
        coinmarketcap.BTCZTicker().then(body => {
            const data = [
                `Price: *${format.coins(body.price_btc)} BTC (${format.usd(body.price_usd)})*`,
                `24hr Vol (USD): *${format.usd(body['24h_volume_usd'])}*`,
                `Market Cap: *${format.usd(body.market_cap_usd)}*`,
                `Supply: *${format.integer(body.total_supply)} BTCZ*`,
            ]

            stats.push(...data)
            cache.set('stats-cmm', data)

            if (--waiting === 0) callback()
        })
    }


    // Fetch data from insight
    if (undefined !== cache.get('stats-btcz')) {
        stats.push(...cache.get('stats-btcz'))
        if (--waiting === 0) callback()
    } else {
        fetchBTCZStatus().then(body => {
            const btcz = body.info
            const data = [
                `Difficulty: *${format.integer(btcz.difficulty)}*`,
                `Block Height: *${format.integer(btcz.blocks)}*`,
            ]

            stats.push(...data)
            cache.set('stats-btcz', data, 30)

            if (--waiting === 0) callback()
        })
    }

    btczexplorer.netowrkHashrate().then(body => {
        stats.push(...[
            `Network Hashrate: *${format.hashrate(body)}*`,
        ])

        if (--waiting === 0) callback()
    })
}
