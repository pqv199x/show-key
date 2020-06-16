const bip39 = require('bip39')
const bitcoinjs = require('bitcoinjs-lib')

async function revealAddress (words, offset, hdPath) {
    try {
        const seed = bip39.mnemonicToSeedSync(words)
        const master = bitcoinjs.bip32.fromSeed(seed,bitcoinjs.networks.bitcoin)
        const result = []
        for (let i = 0; i < offset; i++) {
            const childkey = master.derivePath(`${hdPath}/${i}`)
            const pub = childkey.publicKey.toString('hex')
            const pri = childkey.toWIF()
            const add = bitcoinjs.payments.p2pkh({ pubkey: childkey.publicKey, network: bitcoinjs.networks.bitcoin })
            result.push({
                index: i,
                address: add.address,
                publicKey: pub,
                privateKey: pri
            })
        }
        return result
        
    } catch (error) {
        throw error
    }
}

module.exports = revealAddress
