const tomo = require('./tomo')
const bitcoin = require('./btc')
const tron = require('./tron')
const solana = require('./sol')
const RevealAddress = {
    tomo: (words, offset, hdPath) => {
        return tomo(words, offset, hdPath)
    },
    bitcoin: (words, offset, hdPath) => {
        return bitcoin(words, offset, hdPath)
    },
    tron: (words, offset, hdPath) => {
        return tron(words, offset, hdPath)
    },
    solana: (words, offset, hdPath) => {
        return solana(words, offset, hdPath)
    }
}

module.exports = RevealAddress
