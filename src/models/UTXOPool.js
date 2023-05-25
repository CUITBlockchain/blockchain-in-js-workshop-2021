// import UTXO from './UTXO.js'
//
// class UTXOPool {
//   constructor(utxos = {}) {
//     this.utxos = utxos
//   }
//
//   // 添加交易函数
//   /**
//    * 将交易的信息更新至 UTXOPool 中
//    */
//   addUTXO() {
//
//   }
//
//   // 将当前 UXTO 的副本克隆
//   clone() {
//
//   }
// }
//
// export default UTXOPool

import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  addUTXO(owner, amount) {
    if (this.utxos[owner]) {
      this.utxos[owner].amount += amount
    } else {
      this.utxos[owner] = new UTXO(owner, amount)
    }
  }

  clone() {
    return new UTXOPool({ ...this.utxos })
  }
}

export default UTXOPool

