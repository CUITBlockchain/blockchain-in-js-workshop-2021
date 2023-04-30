import UTXOPool from './UTXOPool.js'

// Blockchain
// class Blockchain {
//   // 1. 完成构造函数及其参数
//   /* 构造函数需要包含
//       - 名字
//       - 创世区块
//       - 存储区块的映射
//   */
//   constructor() {}

//   // 2. 定义 longestChain 函数
//   /*
//     返回当前链中最长的区块信息列表
//   */
//   longestChain() {
//     return []
//   }

//   // 判断当前区块链是否包含
//   containsBlock(block) {
//     // 添加判断方法
//     return false
//   }

//   // 获得区块高度最高的区块
//   maxHeightBlock() {
//     // return Block
//   }

//   // 添加区块
//   /*

//   */
//   _addBlock(block) {
//     if (!block.isValid()) return
//     if (this.containsBlock(block)) return
//   }
// }

// export default Blockchain

// ===

import { maxBy, reduce, unfold, reverse, values, prop } from 'ramda'

// Blockchain
class Blockchain {
  // 构造函数
  constructor(name) {
    this.name = name
    this.genesis = null
    this.blocks = {}

    this.pendingTransactions = {}
  }

  longestChain() {
    const blocks = values(this.blocks)
    const maxByHeight = maxBy(prop('height'))
    const maxHeightBlock = reduce(maxByHeight, blocks[0], blocks)
    const getParent = (x) => {
      if (x === undefined) {
        return false
      }

      return [x, this.blocks[x.parentHash]]
    }
    return reverse(unfold(getParent, maxHeightBlock))
  }

  containsBlock(block) {
    return this.blocks[block.hash] !== undefined
  }

  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    // check that the parent is actually existent and the advertised height is correct
    const parent = this.blocks[block.parentHash]
    if (
      block.height != 1 &&
      parent === undefined &&
      parent.height + 1 !== block.height
    )
      return

    // Add coinbase coin to the pool of the parent
    const newUtxoPool =
      parent && parent.utxoPool ? parent.utxoPool.clone() : new UTXOPool()
    newUtxoPool.addUTXO(block.coinbaseBeneficiary, 12.5)
    block.utxoPool = newUtxoPool

    this.blocks[block.hash] = block
  }
}

export default Blockchain
