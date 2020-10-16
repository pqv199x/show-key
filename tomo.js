const bip39 = require('bip39')
const bitcoinjs = require('bitcoinjs-lib')
const HDKey = require('hdkey')
const privateKeyToAddress = require('ethereum-public-key-to-address')
const ethers = require('ethers')

async function revealAddress (words, offset, hdPath) {
    try {
        const seed = bip39.mnemonicToSeedSync(words)
        const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
        const result = []
        for (let i = 0; i < offset; i++) {
            const childkey = hdkey.derive(`${hdPath}/${i}`)
            const pub = childkey.publicKey.toString('hex')
            const pri = childkey.privateKey.toString('hex')
            result.push({
                index: i,
                address: ethers.utils.getAddress(privateKeyToAddress(pub)),
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
