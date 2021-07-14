const bip32 = require('bip32')
const bip39 = require('bip39')
const { Account, Connection } = require('@solana/web3.js')
const nacl = require('tweetnacl')
const { derivePath } = require('ed25519-hd-key')

async function revealAddress (words, offset, choice) {
    try {
        const seed = bip39.mnemonicToSeedSync(words)
        const seedBufferHex = Buffer.from(seed).toString('hex')

        const derivedSeed = bip32.fromSeed(Buffer.from(seedBufferHex, 'hex'))

        const result = []
        let key
        for (let i = 0; i < offset; i++) {
            switch (choice) {
                case '0':
                    key = derivedSeed.derivePath(`m/501'/0'/0/${i}`).privateKey
                    break
                case '1':
                    key = derivePath(`m/44'/501'/${i}'`, seedBufferHex).key
                    break
                case '2':
                    key = derivePath(`m/44'/501'/0'/${i}'`, seedBufferHex).key
                    break
                default:
                    break
            }
            // const childkey = derivedSeed.derivePath(`${hdPath}/${i}`)
            // const account = new Account(nacl.sign.keyPair.fromSeed(childkey.privateKey).secretKey)

            const account = new Account(nacl.sign.keyPair.fromSeed(key).secretKey)
            const accountObj = JSON.parse(JSON.stringify(account.secretKey))

            result.push({
                index: i,
                address: account.publicKey.toBase58(),
                // publicKey: account.publicKey,
                privateKey: '[' + accountObj.data.toString() + ']'
            })
        }
        return result
        
    } catch (error) {
        throw error
    }
}

module.exports = revealAddress
