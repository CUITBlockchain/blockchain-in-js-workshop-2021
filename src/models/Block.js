import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 3

class Block {
  // 1. 完成构造函数及其参数




  constructor(blockchain,previousHash,height,hash) {
    this.blockchain = blockchain;
    this.hash=hash
    this.previousHash = previousHash.toString();
    this.height = height;

  }

  isValid() {
    if (this.previousHash ==='root'){
      return true
    }
    return  this.hash === this.calculateHash()&&
        (this.hash.substring(0,DIFFICULTY) ==='0'.repeat(DIFFICULTY))
  }

  setNonce(nonce) {
    this.nonce=nonce
    this.setHash()
  }

  calculateHash(){
    return sha256(
      this.nonce+
        this.previousHash+
        this.height
    ).toString();
  }
  setHash(){
    this.hash = this.calculateHash()
  }
  


  isValid() {
    return false
  }

  setNonce(nonce) {}

}

export default Block
