const numeral = require('numeral')

module.exports.uptime = uptime => {
    let unit = 'second'

    if (uptime > 60) {
        uptime = uptime / 60
        unit = 'minute'
    }

    if (uptime > 60) {
        uptime = uptime / 60
        unit = 'hour'
    }

    if (uptime != 1) {
        unit = unit + 's'
    }

    return `${uptime} ${unit}`
}

module.exports.hashrate = hashes => {
    let unit = 'Sol/s'
    if (hashes >= 1000000) {
        hashes = hashes / 1000 / 1000
        unit = 'Msol/s'
    } else if (hashes >= 1000) {
        hashes = hashes / 1000
        unit = 'Ksol/s'
    }

    return module.exports.float(hashes) + ' ' + unit
}

module.exports.usd = dollars => numeral(dollars).format('$0,0.000')

module.exports.integer = integer => numeral(integer).format('0,0')

module.exports.float = number => numeral(number).format('0,0.00')

// NOTE: numeral library returns NaN when you try to format numbers less than
// 100 satoshis. For this reason, we let numeral format the whole numbers since
// decimals don't need commas, etc.
module.exports.coins = coins => {
    const whole = Math.trunc(coins)
    const decimal = parseFloat(coins - whole)

    return numeral(whole).format('0,0') + ('' + parseFloat(decimal).toFixed(8)).substr(1)
}
