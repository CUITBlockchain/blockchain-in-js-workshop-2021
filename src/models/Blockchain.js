// Blockchain
import Block from "./Block.js";
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
    if (this.genesis){
      this.blocks[this.genesis.hash] = this.genesis
    }
  }



  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */


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





}

export default Blockchain
