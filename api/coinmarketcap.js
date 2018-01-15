const request = require('request-promise')
const NodeCache = require('node-cache')

const cache = new NodeCache({
    stdTTL: 300
})

/**
 * Example response from coinmarketcap call:
 * {
 *     "id": "bitcoinz",
 *     "name": "BitcoinZ",
 *     "symbol": "BTCZ",
 *     "rank": "428",
 *     "price_usd": "0.0219492",
 *     "price_btc": "0.00000152",
 *     "24h_volume_usd": "293700.0",
 *     "market_cap_usd": "19209394.0",
 *     "available_supply": "875175110.0",
 *     "total_supply": "875175110.0",
 *     "max_supply": "21000000000.0",
 *     "percent_change_1h": "5.67",
 *     "percent_change_24h": "55.61",
 *     "percent_change_7d": "52.1",
 *     "last_updated": "1515550755"
 * }
 *
 * This api call is automatically cached for 5 minutes since coinmarketcap only updates once every 5 minutes.
 */
module.exports.BTCZTicker = () => {
    let key = 'coinmarketcap-ticker'
    let data = cache.get(key)

    if (undefined !== data) {
        return Promise.resolve(data)
    }

    return request({
        uri: 'https://api.coinmarketcap.com/v1/ticker/bitcoinz/',
        json: true,
    }).then(body => {
        cache.set(key, body[0])
        return body[0]
    })
}
