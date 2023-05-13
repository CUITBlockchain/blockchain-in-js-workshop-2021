import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数



  constructor(blockchain,previousHash,height,hash) {
    this.blockchain = blockchain;
    this.hash=hash
    this.previousHash = previousHash.toString();
    this.height = height;

  }

  isValid() {

  }

  setNonce(nonce) {
    this.nonce=nonce
  }
  

}

export default Block

