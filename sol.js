const bip32 = require('bip32')
const bip39 = require('bip39')
const { Account, Connection } = require('@solana/web3.js')
const nacl = require('tweetnacl')

async function revealAddress (words, offset, hdPath) {
    try {
        const seed = bip39.mnemonicToSeedSync(words)
        const seedBufferHex = Buffer.from(seed).toString('hex')

        const derivedSeed = bip32.fromSeed(Buffer.from(seedBufferHex, 'hex'))

        const result = []
        for (let i = 0; i < offset; i++) {

            const childkey = derivedSeed.derivePath(`${hdPath}/${i}`)
            const account = new Account(nacl.sign.keyPair.fromSeed(childkey.privateKey).secretKey)
            result.push({
                index: i,
                address: account.publicKey.toBase58(),
                publicKey: account.publicKey,
                privateKey: childkey.privateKey.toString('hex')
            })
        }
        return result
        
    } catch (error) {
        throw error
    }
}

module.exports = revealAddress
