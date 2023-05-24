import UTXO from './UTXO.js'

class UTXOPool {
    constructor(utxos = {}) {

        this.utxos = utxos


    }

    // 添加交易函数
    /**
     * 将交易的信息更新至 UTXOPool 中
     */
    addUTXO(utxo) {
        // 将新的交易添加进UTXO池中并更新余额

        if (this.utxos[utxo.pubKey] != null) {



            this.utxos[utxo.pubKey] = { amount: this.utxos[utxo.pubKey].amount + utxo.amount };
        } else {

            this.utxos[utxo.pubKey] = { amount: utxo.amount };
        }
    }

    // 将当前 UXTO 的副本克隆
    clone() {
        return this.utxos
    }
}

export default UTXOPool
