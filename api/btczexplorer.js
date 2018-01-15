const request = require('request-promise')
const NodeCache = require('node-cache')

const cache = new NodeCache({
    stdTTL: 30
})

/**
 * Example response from Iquidus netowrkHashrate call
 * 8590969
 * (this is for 8.59 Msol/s)
 *
 * This api call is automatically cached for 1 minute.
 */
module.exports.netowrkHashrate = () => {
    let key = 'btczexplorer-networkHashrate'
    let data = cache.get(key)

    if (undefined !== data) {
        return Promise.resolve(data)
    }

    return request({
        uri: 'https://btczexplorer.blockhub.info/api/getnetworkhashps',
        rejectUnauthorized: false,
    }).then(body => {
        cache.set(key, body)
        return body
    })
}

/**
 * Example response from Iquidus getaddress call
 * {
 *     address: "t1VYxifh5SXwrVx4tp6fGQioLcBuuKfXXNq",
 *     sent: 69750000.95649938,
 *     received: 69800000.95662193,
 *     balance: "50000.00012255",
 *     last_txs: [{
 *             addresses: "73f9e819154bbac11b92bfd0c164a4471ee331a9b57cba2f0c5921c95def5f0a",
 *             type: "vin"
 *         }, {
 *             addresses: "8bfeb7644a6d5dc8da7ceec34a6caac843d7ca0448d0d830162b1d58c13d72b3",
 *             type: "vout"
 *     }]
 * }
 *
 * This api call is automatically cached for 1 minute.
 */
module.exports.getaddress = (address) => {
    let key = 'btczexplorer-getaddress-' + address
    let data = cache.get(key)

    if (undefined !== data) {
        return Promise.resolve(data)
    }

    return request({
        uri: 'https://btczexplorer.blockhub.info/ext/getaddress/' + address,
        json: true,
        rejectUnauthorized: false,
    }).then(body => {
        cache.set(key, body)
        return body
    })
}
