// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name = name
    this.genesis = null
    this.blocks = {}
  }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
    longestChain() {
        let high=null
        // 找出高度最高的区块
        for (let hash in this.blocks) {
            if(!high){
                high=this.blocks[hash]
            }
            if(high.height<this.blocks[hash].height){
                high=this.blocks[hash]
            }
        }
        let longest=[]
        //由最高的区块反推到创世区块
        longest.push(high)
        //找到创世区块就停止循环
        while (high.previousHash!==this.genesis.hash) {
            //循环blocks找到前一个区块
            for (let hash in this.blocks) {
                let block = this.blocks[hash]
                if (high.previousHash === block.hash) {
                    //找到的区块放入最长链表中
                    longest.push(block)
                    high = block
                }
            }
        }
        //逆转数组元素
        return longest.reverse()
    }


}

export default Blockchain
