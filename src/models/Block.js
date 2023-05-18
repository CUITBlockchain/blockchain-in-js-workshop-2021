import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  constructor(blockchain, prevHash, height, data) {
    this.blockchain = blockchain
    this.prevHash = prevHash
    this.height = height
    this.data = data
    this.nonce = -1
    this.hash = ''
  }

  isValid() {
    const prefix = '0'.repeat(DIFFICULTY)
    return this.hash.startsWith(prefix)
  }

  setNonce(nonce) {
    this.nonce = nonce
    this.hash = this.computeHash()
  }

  computeHash() {
    return sha256(
      this.blockchain.name +
        this.prevHash +
        this.height.toString() +
        this.data +
        this.nonce.toString()
    ).toString()
  }
}

export default Block

