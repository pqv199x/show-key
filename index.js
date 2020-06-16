const tomo = require('./tomo')
const bitcoin = require('./btc')
const RevealAddress = {
    tomo: (words, offset, hdPath) => {
        return tomo(words, offset, hdPath)
    },
    bitcoin: (words, offset, hdPath) => {
        return bitcoin(words, offset, hdPath)
    }
}

module.exports = RevealAddress
