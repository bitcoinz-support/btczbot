module.exports.init = controller => {
    controller.hears(['!wallet', '!wallets'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'The best, most secure and stable wallet is the full node wallet, also known as the swing wallet: https://github.com/bitcoinz-pod/bitcoinz-wallet/releases/tag/1.1.0_1.3\n\n' +
            'Also available is a community managed bitpay wallet fork, available at https://github.com/bitcoinz-wallets/bitcoinz-copay-wallet/releases with builds for iOS and Linux.\n\n' +
            'We have an Android wallet managed by the community: https://play.google.com/store/apps/details?id=com.btczcom.btcz\n\n' +
            'Other Android wallets that support BTCZ:\n' +
            '- Coinomi Wallet: https://play.google.com/store/apps/details?id=com.coinomi.wallet\n' +
            '- Delta Wallet:  https://play.google.com/store/apps/details?id=io.getdelta.android\n\n' +
            'Delta wallet is available on IOS: https://itunes.apple.com/us/app/apple-store/id1288676542. Coinomi should be releasing one on IOS soon.\n\n' +
            'Lastly, we have a web-based wallet available at https://www.mybitcoinzwallet.com.'
        )
    })
}

// TODO:
// Donation BOt:
// Donation address t1fHHnAXxoPWGY77sG5Zw2sFfGUTpW6BcSZ now has 254851 BTCZ (+275 BTCZ) thank you!
// For more information type *!donate* type *!funds* to see community funds balance
//
// Donate towards BTCZ funds: https://docs.google.com/document/d/1Oe7Vo_zBb05_z8r52qv9lGOekmHDpWbbtNP4GyJeddw
