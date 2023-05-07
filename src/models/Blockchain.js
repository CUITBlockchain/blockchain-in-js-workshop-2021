// Blockchain
import Block from "./Block.js";

class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */

  constructor(name) {
    this.blocks=[]
    this.name=name
    this.genesis=null
  }


  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let blocks = Object.values(this.blocks)
    blocks.sort((a,b)=>a.height - b.height)
    return blocks
  }
}

export default Blockchain
