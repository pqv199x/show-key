const bip39 = require('bip39')
const HDKey = require('hdkey')
const {TronWeb} = require('tronweb')
const EC = require('elliptic').ec

const getPubKeyFromPriKey = (priKeyBytes) => {
    const ec = new EC('secp256k1');
    const key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    const pubkey = key.getPublic();
    const x = pubkey.x;
    const y = pubkey.y;

    let xHex = x.toString('hex');

    while (xHex.length < 64) {
        xHex = `0${xHex}`;
    }

    let yHex = y.toString('hex');

    while (yHex.length < 64) {
        yHex = `0${yHex}`;
    }

    return `04${xHex}${yHex}`;
}

async function revealAddress (words, offset, hdPath) {
    try {
        const seed = bip39.mnemonicToSeedSync(words)
        const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
        const result = []
        for (let i = 0; i < offset; i++) {
            const childkey = hdkey.derive(`${hdPath}/${i}`)
            const pri = childkey.privateKey.toString('hex')
            const tronweb = new TronWeb({
                fullHost: 'http://127.0.0.1:9090',
                fullNode: 'http://127.0.0.1:9090',
                solidityNode: 'http://127.0.0.1:9090',
                eventServer: 'http://127.0.0.1:9090',
                privateKey: pri
            })

            const pub = getPubKeyFromPriKey(tronweb.utils.code.hexStr2byteArray(pri))

            result.push({
                index: i,
                address: tronweb.address.fromPrivateKey(pri),
                publicKey: pub.toUpperCase(),
                privateKey: pri.toUpperCase()
            })
        }
        return result
        
    } catch (error) {
        throw error
    }
}

module.exports = revealAddress
