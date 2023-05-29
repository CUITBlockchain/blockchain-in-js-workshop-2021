import UTXO from './UTXO.js'
import {clone, values} from "ramda";
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





  // 处理交易函数
  handleTransaction(transaction) {
    if (!this.isValidTransaction(transaction)){
      return
    }
    const inUtxo = this.utxos[transaction.inputPublicKey]
    inUtxo.amount -= transaction.value
    if (inUtxo.amount <=0){
      delete this.utxos[transaction.inputPublicKey]
    }
    this.addUTXO(transaction.outputPublicKey,transaction.value)

  }

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool 
   */
  isValidTransaction(transaction) {
    const {value,inputPublicKey} = transaction
    const Utxo = this.utxos[inputPublicKey]
    if (Utxo == undefined){
      return false
    }
    else {
      return Utxo.amount >= value && value > 0
    }
  }

}

export default UTXOPool
