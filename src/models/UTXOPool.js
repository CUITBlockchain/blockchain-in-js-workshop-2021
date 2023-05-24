import UTXO from './UTXO.js'
import {clone} from "ramda";
class UTXOPool {
  constructor(utxos = {}) {
    this.utxos=utxos
  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(publicKey,amount) {
    if (this.utxos[publicKey]){
      this.utxos[publicKey].amount += amount
    }
    else {
      const newUtxo = new UTXO(publicKey,amount)
      this.utxos[publicKey] = newUtxo
    }

  }

  // 将当前 UXTO 的副本克隆
  clone() {
    return new UTXOPool(clone(this.utxos))
  }
}

export default UTXOPool
