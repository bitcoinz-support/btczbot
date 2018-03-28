module.exports.init = controller => {
    controller.hears(['!lotto', '!lottery'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Check out https://hash4.btcz.rocks/ to learn about how to donate to the community and enter the weekly drawing for 10% of the donations!'
        )
    })


    controller.hears(['!fund', '!funds', '!donate', '!donation'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        // TODO: add stats about current status of donations
        bot.reply(
            message,
            '\nBitcoinZ Donations Site:\n' +
            '- https://btcz.fund/'
        )
    })


    const help = '*Dynamic bot commands:*\n' +
        '!stats, !earnings {sols/s} {hours (optional)}, !value {btcz-amount}, !wallet {btcz-wallet}\n' +
        '*Static bot commands:*\n' +
        '!why, !wallet, !merch, !fund, !lottery, !logos, !pools, !faq, !donate, !my-coins!, !exchanges, !vote'
    controller.hears(['!help', '!commands'], 'ambient,direct_message,direct_mention,mention', (bot, message) => bot.whisper(message, help))
    controller.hears(['!help', '!commands'], 'bot_message', (bot, message) => bot.reply(message, help))


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


    controller.hears(['!wallet', '!wallets'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'The best, most secure and stable wallet is the full node wallet, also known as the swing wallet: https://github.com/btcz/bitcoinz-wallet/releases\n\n' +
            'Also available is a community managed bitpay wallet fork, available at https://github.com/bitcoinz-wallets/bitcoinz-copay-wallet/releases with builds for iOS and Linux.\n\n' +
            '*Android wallets*:\n' +
            '- https://play.google.com/store/apps/details?id=com.btczcom.btcz (community managed)\n' +
            '- Coinomi Wallet: https://play.google.com/store/apps/details?id=com.coinomi.wallet\n\n' +
            '*Paper wallets*:\n' +
            '- https://paper.btcz.rocks\n\n' +
            '*Web-based wallets*:\n' +
            '- https://www.mybitcoinzwallet.com.\n\n' +
            'Use Delta to manage your crypto portfolio (BTCZ supported):\n' +
            '- Android:  https://play.google.com/store/apps/details?id=io.getdelta.android\n' +
            '- IOS: https://itunes.apple.com/us/app/apple-store/id1288676542.\n\n' +
            'Coinomi should be releasing one on IOS soon.'
        )
    })


    controller.hears(['!pools', '!mining'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Current pools: https://bitcoinzguiding.ovh/pools.html\n' +
            'Mining guide: https://btcz.rocks/media/BitcoinZ_WALLET+MINING_GUIDE.pdf'
        )
    })


    controller.hears(['!vote'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            '*Vote for BTCZ:*\n' +
            '- https://feedback.coinfalcon.com/feature-request/p/coin-bitcoinz-btcz\n' +
            '- https://cobinhood.canny.io/token-listing/p/list-bitcoinzbtcz-on-cobinhood\n' +
            '- https://nextexchange.featureupvote.com/suggestions/2405/bitcoinz-btcz\n' +
            '*Vote on issues:*\n' +
            '- Ledger Nano S Wallets(https://docs.google.com/document/d/1wx90oPq_gfZAYYjbF_QfJ2586NUs7oUjLDRhoezwO8I/edit?usp=sharing): http://www.strawpoll.me/14976387'
        )
    })


    controller.hears(['!winblows-wallet'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'So sorry about any inconvenience that the swing wallet not working has caused!\n\n' +
            'Try some (or all) of the following and hopefully your issue will be resolved.\n' +
            '*First and foremost, close the wallet. Next, create a backup of your data directory - (%AppData%\\BitcoinZ)!* Do this before proceeding.\n\n' +

            '*Seed nodes*:\n' +
            '- Goto Start -> type in the box %AppData%\\BitcoinZ\n' +
            '- Edit the bitcoinz.conf file and add these nodes - just paste them into the file:\n' +
            '```\n' +
            'addnode=136.33.111.57\n' +
            'addnode=52.207.253.9\n' +
            'addnode=34.211.79.94\n' +
            'addnode=148.251.6.58\n' +
            'addnode=38.99.163.72\n' +
            'addnode=62.12.7.151\n' +
            'addnode=52.50.226.122\n' +
            'addnode=46.101.249.50\n' +
            'addnode=btzseed.blockhub.info\n' +
            'addnode=dnsseed.kemperink.org\n' +
            'addnode=seeder.nomadteam.net\n' +
            'addnode=btcz.webrats.com\n' +
            'addnode=btcz.es\n' +
            'addnode=seed.btcz.life\n' +
            'addnode=btcz.vnminers.com\n' +
            'addnode=ajnnljf6ybwyazfw.onion\n' +
            '```\n' +
            'NOTE: Discord/Telegram users -- the relay bot may have added `http://` to some of them. Please remove it! None of the `addnode=` should have `http://`.\n' +
            '- Save, close the file and see if this fixes your issue.\n\n' +

            '*Clear and re-fetch the blockchain*:\n' +
            '- Download a blockchain bootstrap from: https://s3-us-west-1.amazonaws.com/cryptochainer/blockchains/BitcoinZ_blockchain.zip\n' +
            '- Delete everything but the wallet.dat and bitcoinz.conf from %AppData%\\BitcoinZ.\n' +
            '- Extract the downloaded zip file into %AppData%\\BitcoinZ\n' +
            '- Start the wallet again'
        )
    })


    controller.hears(['!why'], 'ambient,bot_message,direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(
            message,
            'Because, https://www.youtube.com/watch?v=2zaOVFLt858'
        )
    })
}

// TODO:
// Donation BOt:
// Donation address t1fHHnAXxoPWGY77sG5Zw2sFfGUTpW6BcSZ now has 254851 BTCZ (+275 BTCZ) thank you!
// For more information type *!donate* type *!funds* to see community funds balance
//
// Donate towards BTCZ funds: https://docs.google.com/document/d/1Oe7Vo_zBb05_z8r52qv9lGOekmHDpWbbtNP4GyJeddw
