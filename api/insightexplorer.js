const request = require('request-promise')
const NodeCache = require('node-cache')

const cache = new NodeCache({
    stdTTL: 30
})

/**
 * Example response from insight call:
 * {
 *     info: {
 *         version: 1010150,
 *         protocolversion: 170002,
 *         blocks: 70438,
 *         timeoffset: 0,
 *         connections: 105,
 *         proxy: "",
 *         difficulty: 210612.0608549607,
 *         testnet: false,
 *         relayfee: 0.000001,
 *         errors: "",
 *         network: "livenet"
 *     }
 * }
 *
 * This api call is automatically cached for 30 seconds.
 */
module.exports.status = () => {
    let key = 'insightexplorer-status'
    let data = cache.get(key)

    if (undefined !== data) {
        return Promise.resolve(data)
    }

    return request({
        uri: 'https://explorer.btcz.rocks/api/status',
        json: true,
    }).then(body => {
        cache.set(key, body.info)
        return body.info
    })
}

module.exports.difficulty = () => {
    let key = 'insightexplorer-difficulty'
    let data = cache.get(key)

    if (undefined !== data) {
        return Promise.resolve(data)
    }

    return request({
        uri: 'https://explorer.btcz.rocks/api/chart/difficulty',
        json: true,
    }).then(body => {
        const difficulties = body.data.json.difficulty
        const average = difficulties.reduce((p, c) => p + c, 0) / difficulties.length
        // console.warn(difficulties, average)

        cache.set(key, average)
        return average
    })
}
