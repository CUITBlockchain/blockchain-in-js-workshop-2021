
// Blockchain
import Block from "./Block.js";
import {maxBy, prop, reduce, reverse, unfold, values} from "ramda";




import UTXOPool from './UTXOPool.js'


class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */

  constructor(name) {
    this.blocks={}
    this.name=name
    this.genesis=null
    if (this.genesis){
      this.blocks[this.genesis.hash] = this.genesis
    }
  }







  maxHeightBlock() {
    const blocks = values(this.blocks);
    const maxByHeight = maxBy(prop("height"));
    const maxHeightBlock = reduce(maxByHeight, blocks[0], blocks);
    return maxHeightBlock;
  }

  longestChain() {
    const getParent = x => {
      if (x === undefined) {
        return false;
      }

      return [x, this.blocks[x.previousHash]];
    };
    return reverse(unfold(getParent, this.maxHeightBlock()));
  }








  // 判断当前区块链是否包含
  containsBlock(block) {
    // 添加判断方法
    return false
  }




  // 添加区块
  /*

  */
  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    // 添加 UTXO 快照与更新的相关逻辑
  }

}

export default Blockchain
