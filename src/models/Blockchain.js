// Blockchain
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
      }
  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
    longestChain() {
      let maxHeight = -1
      let maxHeightBlock = null
  
      for (const block of Object.values(this.blocks)) {
        if (block.height > maxHeight) {
          maxHeight = block.height
          maxHeightBlock = block
        }
      }
  
      const chain = []
      let currentBlock = maxHeightBlock
  
      while (currentBlock) {
        chain.unshift(currentBlock)
        currentBlock = this.blocks[currentBlock.prevHash]
      }
  
      return chain
    }
  }

export default Blockchain
