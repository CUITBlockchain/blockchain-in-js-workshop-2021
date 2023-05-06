import sha256 from 'crypto-js/sha256.js'
class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(blockchain,previousHash, height, data) {
    this.previousHash=previousHash
    this.blockchain=blockchain
    this.height=height
    this.data=data
    this.hash=sha256(this.previousHash+this.blockchain+this.height+JSON.stringify(this.data)).toString()
  }
}

export default Block
