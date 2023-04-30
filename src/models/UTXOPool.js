import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {}

  addUTXO(publicKey, amount) {}

  clone() {}

  // 处理交易函数
  handleTransaction() {}

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool 
   */
  isValidTransaction() {}
}

export default UTXOPool
