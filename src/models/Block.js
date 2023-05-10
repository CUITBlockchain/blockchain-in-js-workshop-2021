import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(blockChain,previousHash,height,hash) {
    this.blockChain = blockChain
    this.previousHash = previousHash
    this.height = height
    this.hash = hash
  }

  isValid() {}

  setNonce(nonce) {}
  
}

export default Block

