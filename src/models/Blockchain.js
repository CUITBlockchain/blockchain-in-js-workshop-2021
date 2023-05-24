// Blockchain
import {maxBy, prop, reduce, reverse, unfold, values} from "ramda";


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
    if (this.blocks[block.hash] === block){
      return true
    }
    return false
  }


  // 添加区块

  /*

  */
  _addBlock(block) {
    if (!block.isValid())
      return;
    if (this.containsBlock(block))
      return;
    const previousBlock = this.blocks[block.previousHash];
    if (block.previousHash=='root'){
      block.utxoPool=this.genesis.utxoPool.clone()
      block.utxoPool.addUTXO(block.coinbaseBeneficiary,12.5)
      this.blocks[block.hash] = block;

      return;
    }
    if (previousBlock === undefined && previousBlock.height + 1 !== block.height  )
      return;


    block.utxoPool=previousBlock.utxoPool.clone()


    block.utxoPool.addUTXO(block.coinbaseBeneficiary,12.5)


    this.blocks[block.hash] = block;
    // 添加 UTXO 快照与更新的相关逻辑
  }

}

export default Blockchain
