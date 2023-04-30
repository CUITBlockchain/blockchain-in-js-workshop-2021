import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor() {}

  isValid() {}

  setNonce(nonce) {}

  // 根据交易变化更新区块 hash
  _setHash() {}

  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  combinedTransactionsHash() {}

  // 添加交易到区块
  /**
   *
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction() {}
}

export default Block
