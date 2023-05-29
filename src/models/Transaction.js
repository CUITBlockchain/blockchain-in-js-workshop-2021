import sha256 from 'crypto-js/sha256.js'


class Transaction {
  constructor(inputPublicKey,outputPublicKey,value,fee,signature) {
    this.inputPublicKey = inputPublicKey
    this.outputPublicKey = outputPublicKey
    this.signature = signature
    this.value = value
    this._setHash()
  }

  // 更新交易 hash
  _setHash() {
    this.hash = this._calculateHash()
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
   return sha256(
       this.inputPublicKey+
       this.outputPublicKey+
       this.value+
       this.signature
   )
  }
}

export default Transaction