const request = require('request-promise')
/**
 * Example response from icanhazdadjoke call:
 * {
 *     info: {
 *         id: "abcdef",
 *         joke: "knock knock...",
 *         status: 200
 *     }
 * }
 */
module.exports.newJoke = () => {
    return request({
        uri: 'https://icanhazdadjoke.com/',
        json: true,
    }).then(body => body.joke)
}
