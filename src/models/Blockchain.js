// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
      constructor：构造函数，接收一个参数 name 表示区块链的名称。
      初始化 name、genesis（初始值为 null，表示创世区块）和 blocks（用于存储所有区块的对象）
  */
      constructor(name) {
        this.name = name  // 区块链的名称
        this.genesis = null  // 创世区块的哈希值
        this.blocks = {}  // 存储区块链中的所有区块
      }
  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
    longestChain：查找最长的区块链。
    首先初始化 maxHeight 为 -1（初始值为最小高度）和 maxHeightBlock 为 null。
    然后遍历所有区块，找到高度最大的区块，并将其赋值给 maxHeightBlock。
    接下来，创建一个空数组 chain 用于存储最长的区块链。
    然后从最高区块开始，逐个向前查找前一个区块，将当前区块添加到 chain 数组的开头，直到达到创世区块。
    最后返回 chain 数组作为最长的区块链
  */
    longestChain() {
      let MaxHeight = -1  // 最大高度初始值为 -1
      let MaxHeightBlock = null  // 最大高度的区块初始值为 null
  
      // 遍历所有区块，找到最大高度的区块
      for (const block of Object.values(this.blocks)) {
        if (block.height > MaxHeight) {
          MaxHeight = block.height
          MaxHeightBlock = block
        }
      }
  
      const chain = []  // 存储最长链上的所有区块
      let currentBlock = MaxHeightBlock
  
      // 从最大高度的区块开始，依次向前遍历区块链，构建最长链
      while (currentBlock) {
        chain.unshift(currentBlock)
        currentBlock = this.blocks[currentBlock.prevHash]
      }
  
      return chain
    }
  }

export default Blockchain
