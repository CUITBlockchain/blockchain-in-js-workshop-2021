import './UTXOPool.js'
import UTXO from "./UTXO.js"

// Blockchain
class Blockchain {
    // 1. 完成构造函数及其参数
    /* 构造函数需要包含
        - 名字
        - 创世区块
        - 存储区块的映射
    */
    constructor(name) {
        this.name = name; //区块的名字
        this.blocks = {}; //用于存储区块的映射
        this.genesis = null; //创世区块
    }

    // 2. 定义 longestChain 函数
    /*
      返回当前链中最长的区块信息列表
    */
    longestChain() {
        let longestChain = [] //声明一个数组来存储最长链

        for (let hash in this.blocks) { //便利每一个区块，找每一个区块的前置节点加入到一个临时数组chain中
            let currentBlock = this.blocks[hash]
            let chain = [currentBlock] //初始化这个临时数组，里面有个节点是当前节点

            while (currentBlock.height != 1) { //判断当前区块如果不是创世区块，就将前一个块放入临时链
                currentBlock = currentBlock.getPreviousBlock(); //将当前块指针前移
                chain.unshift(currentBlock) //将前移过后的当前区块加入到临时链中
            }

            if (chain.length > longestChain.length) { //如果临时链的高度比最长链高，就将临时链赋值给最长链
                longestChain = chain
            }
        }
        return longestChain
    }

    // 判断当前区块链是否包含
    containsBlock(block) {
        // 添加判断方法
        return this.blocks[block.hash] != null
            // return false
    }

    // 获得区块高度最高的区块
    maxHeightBlock() {
        // return Block
        var heightestBlock = this.blocks.element(0)
        for (let hash in this.blocks) {
            currentBlock = blocks[hash]
            if (currentBlock.height > heightestBlock.height) {
                heightestBlock = currentBlock
            }
        }
        return heightestBlock
    }

    // 添加区块
    /*

    */
    _addBlock(block) {
        if (!block.isValid()) return
        if (this.containsBlock(block)) return
            //先间新的区块加入到映射中
        this.blocks[block.hash] = block
            // 添加 UTXO 快照与更新的相关逻辑

        // 复制前一个区块的交易池
        var prepoolutxos = block.getPreviousBlock().utxoPool.clone()
            // 添加创币交易
        block.utxoPool.utxos = prepoolutxos
        let coinbaseUTXO = new UTXO(block.coinbaseBeneficiary, 12.5)
            // 在新区块的交易池中添加这个交易
            // prepool.addUTXO(coinbaseUTXO)
        block.utxoPool.addUTXO(coinbaseUTXO)



    }
}

export default Blockchain