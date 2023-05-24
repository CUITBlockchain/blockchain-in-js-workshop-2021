import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

// Block 类表示区块
class Block {
  constructor(blockchain, prevHash, height, data) {
    this.blockchain = blockchain  // 所属的区块链对象
    this.prevHash = prevHash  // 前一个区块的哈希值
    this.height = height  // 区块的高度
    this.data = data  // 区块存储的数据
    this.nonce = -1  // 随机数（用于工作量证明）
    this.hash = ''  // 区块的哈希值
  }

  // 判断区块是否有效（满足区块难度要求）
  /*isValid：判断区块是否有效，即区块的哈希值是否满足区块难度要求*/
  isValid() {
    const prefix = '0'.repeat(DIFFICULTY)  // 区块哈希值的前缀要求（由难度决定）
    return this.hash.startsWith(prefix)  // 判断区块的哈希值是否以指定前缀开头
  }

  // 设置区块的随机数（计算并更新区块的哈希值）
  setNonce(nonce) {
    this.nonce = nonce  // 设置随机数
    this.hash = this.computeHash()  // 计算并更新区块的哈希值
  }

  // 计算区块的哈希值
  computeHash() {
    return sha256(
      this.blockchain.name +  // 区块链的名称
        this.prevHash +  // 前一个区块的哈希值
        this.height.toString() +  // 区块的高度（转换为字符串）
        this.data +  // 区块存储的数据
        this.nonce.toString()  // 随机数（转换为字符串）
    ).toString()  // 返回计算得到的哈希值
  }
}

export default Block


