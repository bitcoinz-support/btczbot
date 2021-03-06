module.exports.init = controller => {
    controller.hears(['!faq'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        // TODO: add stats about current status of donations
        bot.reply(
            message,
            'Our Frequently Asked Questions (FAQ) can be found at https://goo.gl/jvp3eH.'
        )
    })


    controller.hears(['!fund', '!funds', '!donate', '!donation'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        // TODO: add stats about current status of donations
        bot.reply(
            message,
            '\nBitcoinZ Donations Site:\n' +
            '- https://btcz.fund/\n\n' +
            'Learn more at: https://goo.gl/zJDCgA'
        )
    })


    const help = '*Dynamic bot commands:*\n' +
        '!stats, !earnings {sols/s} {hours (optional)}, !value {btcz-amount}, !wallet {btcz-wallet}\n' +
        '*Static bot commands:*\n' +
        '!why, !wallet, !merch, !fund, !lottery, !logos, !pools, !faq, !donate, !my-coins!, !exchanges, !vote, !social, !tx-failed'
    controller.hears(['!help', '!commands'], 'ambient,direct_message,direct_mention,mention', (bot, message) => bot.whisper(message, help))
    controller.hears(['!help', '!commands'], 'bot_message', (bot, message) => bot.reply(message, help))


    controller.hears(['!tx-failed'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'If you\'re trying to send coins from a wallet that you mine to and the transaction is failing, it may be that the transaction has too many inputs.\n' +
            'There is a restriction in the blockchain that limits how many inputs are allowed per transaction to keep someone from executing a denial of service attack.\n' +
            'This issue comes from upstream (Zcash) and can be followed here: https://github.com/zcash/zcash/issues/1970.\n\n' +
            'One way to work around this issue for now is to try sending a smaller amount. Keep decreasing the transaction amount until it succeeds. ' +
            'In addition, you can decrease your transaction fee to 0.0001 or use the Economy transaction fee in the light Wallet.'
        )
    })


    controller.hears(['!logo', '!logos'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'The latest BitcoinZ logo pack: https://btcz.rocks/media/bitcoinz_btcz_logos.zip\n' +
            'You can also find tons of BitcoinZ marketing materials on the forum at https://forum.btcz.rocks/t/marketing-material-repository/29'
        )
    })


    controller.hears(['!lotto', '!lottery'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Check out https://hash4.btcz.rocks/ to learn about how to donate to the community and enter the weekly drawing for 10% of the donations!\n\n' +
            'Get our wicked awesome gui LotteryMiner at https://github.com/bitcoinz-support/hash4btcz-miner#hash4btcz-miner!'
        )
    })


    controller.hears(['!merch', '!merchandise'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Merchandise sites that accept BTCZ:\n' +
            '- https://www.flipmybitz.com/\n' +
            '\nBuy from Amazon (and others) and donate to BTCZ:\n' +
            '- http://zebrafunds.org/\n' +
            '\nBuy BTCZ branded Merchandise:\n' +
            '- https://fineartamerica.com/profiles/boudraa-momo/shop\n' +
            '- https://shop.spreadshirt.com/BitcoinZ/'
        )
    })


    controller.hears(['!my-coins!'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Your  coins are safely stored in the blockchain. They\'re not going anywhere. ' +
            'The only potential way to lose your coins is if you lose your private key or seed. So.. ' +
            'how do you "get your coins back"? When you open the wallet, tap on "recreate wallet". ' +
            'Next, you need to go to `settings -> Select wallet -> more options -> addresses -> scan addresses for funds`. ' +
            'After this completes, your wallet should be good-to-go, with all of the transactions. ' +
            'If you notice transactions missing in the future, do this process again and they should be restored. ' +
            'Remember, your coins are stored in the blockchain. All this wallet does is provide you with a graphical interface to your coins (using your private key).'
        )
    })


    controller.hears(['!pools', '!mining'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Current pools: https://forum.btcz.rocks/t/pools-that-love-the-bitcoinz-community/51\n' +
            'Mining guide: https://btcz.rocks/media/BitcoinZ_WALLET+MINING_GUIDE.pdf'
        )
    })


    controller.hears(['!vote'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            '*Vote for BTCZ:*\n' +
            '- https://dontoshi.featureupvote.com/suggestions/7500/bitcoinz-btcz\n' +
            '- https://request.coinpulse.io/suggestions/5767/bitcoinz-btcz\n' +
            '- https://coindeal.com/vote\n' +
            '- https://nextexchange.featureupvote.com/suggestions/2405/bitcoinz-btcz\n' +
            '- https://feedback.coinfalcon.com/coin-request/p/bitcoinz-btcz-1\n' +
            '- https://feedback.altcoinexchange.com/suggestions/2021/bitcoinz-btcz-pow-equihash-algorithm\n' +
            '- https://support.cex.io/hc/en-us/community/posts/115002759994-NEW-BitcoinZ-BTCZ-Please-Vote\n' +
            '- https://mercatox.com/coins/list?name=btcz\n' +
            '- https://lescovex.featureupvote.com/suggestions/6864/bitcoinz-btcz\n' +
            '*Info of exchanges:*\n' +
            '- https://info.btcz.rocks/#Exchanges'
        )
    })


    controller.hears(['!wallet', '!wallets'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'The best, most secure and stable wallet is the full node wallet, also known as the swing wallet: https://github.com/btcz/bitcoinz-wallet/releases\n\n' +
            'Also available is a community managed bitpay wallet fork, available at https://github.com/bitcoinz-wallets/bitcoinz-copay-wallet/releases with builds for iOS and Linux.\n\n' +
            '*Android wallets*:\n' +
            '- https://play.google.com/store/apps/details?id=com.btczcom.btcz (community managed)\n' +
            '- Coinomi Wallet: https://play.google.com/store/apps/details?id=com.coinomi.wallet\n\n' +
            '*iOS wallets*:\n' +
            '- Coinomi Wallet: https://itunes.apple.com/us/app/coinomi-wallet/id1333588809.\n' +
            '*Paper wallets*:\n' +
            '- https://paper.btcz.rocks\n\n' +
            '*Web-based wallets*:\n' +
            '- https://www.mybitcoinzwallet.com.\n\n' +
            'Use Delta to manage your crypto portfolio (BTCZ supported):\n' +
            '- Android:  https://play.google.com/store/apps/details?id=io.getdelta.android\n' +
            '- IOS: https://itunes.apple.com/us/app/apple-store/id1288676542.\n\n'
        )
    })


    controller.hears(['!why'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Because, https://vimeo.com/254630434'
        )
    })


    controller.hears(['!winblows-wallet'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Please see the following link for tips to get your Swing  Wallet working again! https://goo.gl/MhMZpz'
        )
    })
    

    controller.hears(['!social'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            '*Follow BTCZ:*\n' +
            'Facebook - https://www.facebook.com/BTCZCommunity\n' +
            'Twitter - https://twitter.com/BitcoinZTeam\n' +
            'Youtube - https://www.youtube.com/channel/UC2MBhoVK45Eqp2cMb2bFuUA\n' +
            'Instagram- https://www.instagram.com/bitcoinzcommunity\n' +
            'Slack - https://slack.btcz.rocks\n' +
            'Telegram - https://t.me/bitcoinzcommunity\n' +
            'Discord - https://discordapp.com/invite/u3dkbFs\n' +
            'Reddit - https://www.reddit.com/r/BTCZCommunity\n' +
            'Bitcointalk - https://bitcointalk.org/index.php?topic=3086664.0\n' +
            'Forum - https://forum.btcz.rocks\n'
        )
    })
}

// TODO:
// Donation BOt:
// Donation address t1fHHnAXxoPWGY77sG5Zw2sFfGUTpW6BcSZ now has 254851 BTCZ (+275 BTCZ) thank you!
// For more information type *!donate* type *!funds* to see community funds balance
//
// Donate towards BTCZ funds: https://docs.google.com/document/d/1Oe7Vo_zBb05_z8r52qv9lGOekmHDpWbbtNP4GyJeddw
