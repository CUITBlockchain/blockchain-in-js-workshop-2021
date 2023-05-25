<<<<<<< Updated upstream
// Blockchain
import block from "./Block.js";

class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name = name;
    this.genesis = null;
    this.blocks = {};
=======
// import UTXOPool from './UTXOPool.js'
// import block from "./Block.js"
//
// class Blockchain {
//   // 1. 完成构造函数及其参数
//   /* 构造函数需要包含
//       - 名字
//       - 创世区块
//       - 存储区块的映射
//   */
//   constructor(name) {
//     this.name = name;
//     this.genesis = null;
//     this.blocks = {};
//     this.utxoPool = new UTXOPool()
//   }
//
//   // 2. 定义 longestChain 函数
//   /*
//     返回当前链中最长的区块信息列表
//   */
//   longestChain() {
//
//     /**
//      * 思路：
//      * 1. 定义一个数组用来存储最长链
//      *  let longestChain = new Arrays()
//      * 2. 先找到链中最后的那一个区块
//      *   2.1
//      *   2.2 将最后一块区块之前的所有区块存储到数组中
//      *      2.2.1 遍历blockChain中的blocks属性
//      *     tips： == 小测试 ==
//      *       for (let key in this.blocks) {
//      *        //var temp
//                 // for (var name in p2) {
//                 //     // if (`name` == "name")
//                 //     // console.log("name is " + p2[`name`]);
//                 //     console.log(name)
//                 //     temp = name;
//                 // }
//                   console.log(temp) // 此时的temp就是对象属性的最后一个值
//                 // 这样一来就可以遍历得到blocks中最后一个block的hash的值，因为block的第四个属性为hash
//      *  }
//      2.2.2 逆向访问blocks，直到创世区块时停止
//      *   2.3 将数组反转
//      2.4 返回数组
//      */
//
//     let longChain = []; // 声明最长链
//
//     // 遍历区块链，寻找最长链
//     var lastBlockHash; // 用来接收blockChain中最后一块区块的hash
//     for (var hash in this.blocks) { // 遍历this.blocks里的所有属性
//       lastBlockHash = hash; // 依次遍历，不停的替换操作
//     }
//
//     // for 循环结束之后，lastBlockHash 的值为最后一个区块的 hash
//     var currentBlock = this.blocks[lastBlockHash];
//
//     // 区块链从后往前遍历，直到遍历到创世区块为止
//     while (true) {
//
//       longChain.push(currentBlock); // 先将当前区块push进数组
//
//       // 把if 判断语句放这里的原因，如果到了第一块区块时，就结束循环了
//       // 如果放在 currentBlock更新操作之后，将无法存储第一块区块
//       if (currentBlock.previousHash === "root") {
//         break;
//       }
//
//       currentBlock = this.blocks[currentBlock.previousHash]
//     }
//
//     longChain = longChain.reverse(); // 反转数组，返回数组
//     return longChain
//   }
//
//   // 判断当前区块链是否已经包含即将加入链上的区块（即区块是否重复上链）
//   containsBlock(block) {
//     // 添加判断方法
//     return block.hash in this.blocks
//   }
//
//   // 获得区块高度最高的区块
//   maxHeightBlock() {
//     // return Block
//   }
//
//   // 添加区块
//   /*
//
//   */
//   _addBlock(block) {
//     if (!block.isValid()) return
//     if (this.containsBlock(block)) return
//
//     // 添加 UTXO 快照与更新的相关逻辑
//
//
//     // 如果是这行代码 this.blocks.push(block) 会报错：不能使用push函数
//     // 使用数组的索引来直接将区块赋值给指定位置的元素
//     this.blocks[block.hash] = block
//
//   }
// }
//
// export default Blockchain

import UTXOPool from './UTXOPool.js'

class Blockchain {
  constructor(name) {
    this.name = name
    this.genesis = null
    this.blocks = {}
    this.utxoPool = new UTXOPool()
>>>>>>> Stashed changes
  }

  longestChain() {
<<<<<<< Updated upstream

    /**
     * 思路：
     * 1. 定义一个数组用来存储最长链
     *  let longestChain = new Arrays()
     * 2. 先找到链中最后的那一个区块
     *   2.1
     *   2.2 将最后一块区块之前的所有区块存储到数组中
     *      2.2.1 遍历blockChain中的blocks属性
     *     tips： == 小测试 ==
     *       for (let key in this.blocks) {
     *        //var temp
                // for (var name in p2) {
                //     // if (`name` == "name")
                //     // console.log("name is " + p2[`name`]);
                //     console.log(name)
                //     temp = name;
                // }
                  console.log(temp) // 此时的temp就是对象属性的最后一个值
                // 这样一来就可以遍历得到blocks中最后一个block的hash的值，因为block的第四个属性为hash
     *  }
     2.2.2 逆向访问blocks，直到创世区块时停止
     *   2.3 将数组反转
     2.4 返回数组
     */

    let longChain = []; // 声明最长链

    // 遍历区块链，寻找最长链
    var lastBlockHash; // 用来接收blockChain中最后一块区块的hash
    for (var hash in this.blocks) { // 遍历this.blocks里的所有属性
      lastBlockHash = hash; // 依次遍历，不停的替换操作
    }

    // for 循环结束之后，lastBlockHash 的值为最后一个区块的 hash
    var currentBlock = this.blocks[lastBlockHash];

    // 区块链从后往前遍历，直到遍历到创世区块为止
    while (true) {

      longChain.push(currentBlock); // 先将当前区块push进数组

      // 把if 判断语句放这里的原因，如果到了第一块区块时，就结束循环了
      // 如果放在 currentBlock更新操作之后，将无法存储第一块区块
      if (currentBlock.previousHash === "root") {
        break;
      }

      currentBlock = this.blocks[currentBlock.previousHash]
    }

    longChain = longChain.reverse(); // 反转数组，返回数组
    return longChain
=======
    let maxHeightBlock = this.maxHeightBlock()
    let chain = []
    while (maxHeightBlock) {
      chain.unshift(maxHeightBlock)
      maxHeightBlock = this.blocks[maxHeightBlock.prevHash]
    }
    return chain
  }

  containsBlock(block) {
    return !!this.blocks[block.hash]
  }

  maxHeightBlock() {
    let maxHeight = -1
    let maxHeightBlock = null
    for (const hash in this.blocks) {
      let block = this.blocks[hash]
      if (block.height > maxHeight) {
        maxHeight = block.height
        maxHeightBlock = block
      }
    }
    return maxHeightBlock
  }

  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    if (block.miner) {
      this.utxoPool.addUTXO(block.miner, 12.5)
    }
    this.blocks[block.hash] = block
>>>>>>> Stashed changes
  }
}

export default Blockchain

